export class InventoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, tx) {
        const client = tx ?? this.prisma;
        const batch = await client.inventory.create({ data });
        return batch;
    }
    async findInventoryById(id, tx) {
        const client = tx ? tx : this.prisma;
        const result = await client.inventory.findFirst({
            where: {
                id,
            },
            orderBy: {
                currentStock: "desc",
            },
        });
        return result;
    }
    async getStockByProductId(productId, tx) {
        const client = tx ? tx : this.prisma;
        const result = await client.inventory.findFirst({
            where: {
                productId,
            },
            select: {
                id: true,
                productId: true,
                currentStock: true,
            },
        });
        return result;
    }
    async getStockForProductIds(productIds, tx) {
        const client = tx ? tx : this.prisma;
        const result = await client.inventory.findMany({
            where: {
                productId: {
                    in: productIds,
                },
            },
            select: {
                id: true,
                productId: true,
                currentStock: true,
            },
        });
        return result;
    }
    async decrementStock(inventoryId, quantity, tx) {
        const client = tx ? tx : this.prisma;
        const result = await client.inventory.updateMany({
            where: {
                id: inventoryId,
                currentStock: {
                    gte: quantity,
                },
            },
            data: {
                currentStock: {
                    decrement: quantity,
                },
            },
        });
        return result.count;
    }
}
//# sourceMappingURL=inventory.repository.js.map