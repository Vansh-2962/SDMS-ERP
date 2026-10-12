import type { Prisma } from "@/generated/prisma/client.js";
import type { CertificationRepository } from "./certifications.repository.js";
export declare class CertificationService {
    private readonly certificationRepository;
    constructor(certificationRepository: CertificationRepository);
    create(data: Prisma.ProductCertificationCreateInput, tx?: Prisma.TransactionClient): Promise<{
        id: string;
        productId: string;
        name: string;
        certificateNumber: string | null;
        issuedAt: Date | null;
        expiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=certifications.service.d.ts.map