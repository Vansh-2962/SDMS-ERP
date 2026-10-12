import type { Prisma, PrismaClient, ProductPrice } from "@/generated/prisma/client.js";
export declare class PriceRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.ProductPriceCreateInput, tx?: Prisma.TransactionClient): Promise<ProductPrice>;
}
//# sourceMappingURL=price.repository.d.ts.map