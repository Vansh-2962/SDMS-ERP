export class ProductRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.product.findUnique({
            where: {
                id,
            },
        });
    }
    async findForUser(id, userId, tx) {
        const client = tx ?? this.prisma;
        return client.product.findFirst({
            where: {
                id,
                createdById: userId,
            },
            include: {
                prices: {
                    orderBy: { createdAt: "desc" },
                },
                batches: {
                    orderBy: { createdAt: "desc" },
                },
                inventories: {
                    orderBy: { createdAt: "desc" },
                },
                certifications: {
                    orderBy: { createdAt: "desc" },
                },
                productManufacturer: {
                    include: {
                        manufacturer: true,
                    },
                },
            },
        });
    }
    async findByCode(code, tx) {
        const client = tx ? tx : this.prisma;
        return client.product.findUnique({
            where: {
                code,
            },
        });
    }
    async findByBarcode(barcode, tx) {
        const client = tx ? tx : this.prisma;
        return client.product.findUnique({
            where: {
                barcode,
            },
        });
    }
    async findAll(userId) {
        return this.prisma.product.findMany({
            where: {
                createdById: userId,
            },
            include: {
                prices: true,
                batches: true,
                inventories: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async create(data, tx) {
        const client = tx ? tx : this.prisma;
        return client.product.create({ data });
    }
    async deleteProduct(id) {
        return this.prisma.product.delete({
            where: {
                id,
            },
        });
    }
    async getAllInInvoice(ids, tx) {
        const client = tx ? tx : this.prisma;
        return await client.product.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
            select: {
                id: true,
                name: true,
                hsn: true,
            },
        });
    }
}
//# sourceMappingURL=product.repository.js.map