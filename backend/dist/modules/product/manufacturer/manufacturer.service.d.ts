import type { Prisma } from "@/generated/prisma/client.js";
import type { ManufacturerRepository } from "./manufacturer.repository.js";
export declare class ManufacturerService {
    private readonly manufacturerRepository;
    constructor(manufacturerRepository: ManufacturerRepository);
    create(data: Prisma.ManufacturerCreateInput, tx?: Prisma.TransactionClient): Promise<{
        id: string;
        name: string;
        fssaiLicense: string | null;
        address: string | null;
        countryOfOrigin: string | null;
        customerCarePhone: string | null;
        customerCareEmail: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    attachToProduct(productId: string, manufacturerId: string, tx?: Prisma.TransactionClient): Promise<{
        id: string;
        productId: string;
        manufacturerId: string;
    }>;
}
//# sourceMappingURL=manufacturer.service.d.ts.map