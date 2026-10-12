import type { Prisma, PrismaClient, ProductCertification } from "@/generated/prisma/client.js";
export declare class CertificationRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.ProductCertificationCreateInput, tx?: Prisma.TransactionClient): Promise<ProductCertification>;
}
//# sourceMappingURL=certifications.repository.d.ts.map