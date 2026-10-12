import type { Prisma, PrismaClient, ProductBatch } from "@/generated/prisma/client.js";
export declare class BatchRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.ProductBatchCreateInput, tx?: Prisma.TransactionClient): Promise<ProductBatch>;
}
//# sourceMappingURL=batch.repository.d.ts.map