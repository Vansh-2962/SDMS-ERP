import type { Prisma } from "@/generated/prisma/client.js";
import type { BatchRepository } from "./batch.repository.js";
export declare class BatchService {
    private readonly batchRepository;
    constructor(batchRepository: BatchRepository);
    create(data: Prisma.ProductBatchCreateInput, tx?: Prisma.TransactionClient): Promise<{
        id: string;
        productId: string;
        batchNo: string;
        productionDate: Date | null;
        mfgDate: Date | null;
        expiryDate: Date | null;
        bestBefore: string | null;
        plantId: string | null;
        processingMethod: string | null;
        moistureContent: import("@prisma/client/runtime/client").Decimal | null;
        purityTest: string | null;
        adulterationTest: string | null;
        pesticideTestRef: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=batch.service.d.ts.map