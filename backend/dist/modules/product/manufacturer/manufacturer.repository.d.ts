import type { Manufacturer, Prisma, PrismaClient, ProductManufacturer } from "@/generated/prisma/client.js";
export declare class ManufacturerRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.ManufacturerCreateInput, tx?: Prisma.TransactionClient): Promise<Manufacturer>;
    attachToProduct(productId: string, manufacturerId: string, tx?: Prisma.TransactionClient): Promise<ProductManufacturer>;
}
//# sourceMappingURL=manufacturer.repository.d.ts.map