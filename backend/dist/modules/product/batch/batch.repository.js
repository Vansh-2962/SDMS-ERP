export class BatchRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, tx) {
        const client = tx ?? this.prisma;
        const batch = await client.productBatch.create({ data });
        return batch;
    }
}
//# sourceMappingURL=batch.repository.js.map