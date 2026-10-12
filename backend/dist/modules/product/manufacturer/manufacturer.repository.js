export class ManufacturerRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, tx) {
        const client = tx ?? this.prisma;
        const manufacturer = await client.manufacturer.create({ data });
        return manufacturer;
    }
    async attachToProduct(productId, manufacturerId, tx) {
        const client = tx ?? this.prisma;
        const prodManufacturer = await client.productManufacturer.create({
            data: {
                productId,
                manufacturerId,
            },
        });
        return prodManufacturer;
    }
}
//# sourceMappingURL=manufacturer.repository.js.map