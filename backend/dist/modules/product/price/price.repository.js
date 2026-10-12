export class PriceRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, tx) {
        const client = tx ?? this.prisma;
        const price = await client.productPrice.create({ data });
        return price;
    }
}
//# sourceMappingURL=price.repository.js.map