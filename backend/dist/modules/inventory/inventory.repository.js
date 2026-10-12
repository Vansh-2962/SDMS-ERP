const productStockInclude = {
    inventories: {
        include: {
            batch: {
                select: { batchNo: true },
            },
        },
        orderBy: { createdAt: "asc" },
    },
};
export class InventoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createItem(data) {
        return this.prisma.stockroomItem.create({ data });
    }
    async getAllItems() {
        return this.prisma.stockroomItem.findMany({
            where: { deletedAt: null },
            orderBy: [{ type: "asc" }, { name: "asc" }],
        });
    }
    async getItemById(id) {
        return this.prisma.stockroomItem.findFirst({
            where: { id, deletedAt: null },
        });
    }
    async updateItem(id, data) {
        return this.prisma.stockroomItem.update({
            where: { id },
            data,
        });
    }
    async softDeleteItem(id) {
        return this.prisma.stockroomItem.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async adjustItemStock(id, quantity, direction, reason) {
        return this.prisma.$transaction(async (tx) => {
            const result = await tx.stockroomItem.updateMany({
                where: {
                    id,
                    deletedAt: null,
                    ...(direction === "REMOVE" && { currentStock: { gte: quantity } }),
                },
                data: {
                    currentStock: direction === "ADD"
                        ? { increment: quantity }
                        : { decrement: quantity },
                },
            });
            if (result.count) {
                await tx.inventoryAdjustment.create({
                    data: {
                        stockroomItemId: id,
                        quantity,
                        direction,
                        reason,
                    },
                });
            }
            return result.count;
        });
    }
    async getProductStocks(userId, search) {
        return this.prisma.product.findMany({
            where: {
                createdById: userId,
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { code: { contains: search, mode: "insensitive" } },
                    ],
                }),
            },
            include: productStockInclude,
            orderBy: { name: "asc" },
        });
    }
    async createProductStock(productId, data) {
        return this.prisma.inventory.create({
            data: {
                product: { connect: { id: productId } },
                warehouseLocation: data.warehouseLocation,
                currentStock: data.currentStock,
                reorderLevel: data.reorderLevel,
            },
        });
    }
    async productExists(productId, userId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId, createdById: userId },
            select: { id: true },
        });
        return product !== null;
    }
    async adjustProductStock(id, userId, quantity, direction, reason) {
        return this.prisma.$transaction(async (tx) => {
            const result = await tx.inventory.updateMany({
                where: {
                    id,
                    product: { is: { createdById: userId } },
                    ...(direction === "REMOVE" && { currentStock: { gte: quantity } }),
                },
                data: {
                    currentStock: direction === "ADD"
                        ? { increment: quantity }
                        : { decrement: quantity },
                },
            });
            if (result.count) {
                await tx.inventoryAdjustment.create({
                    data: {
                        inventoryId: id,
                        quantity,
                        direction,
                        reason,
                    },
                });
            }
            return result.count;
        });
    }
}
//# sourceMappingURL=inventory.repository.js.map