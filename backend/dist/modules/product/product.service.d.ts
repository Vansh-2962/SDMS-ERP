import { Prisma, PrismaClient, type Product } from "@/generated/prisma/client.js";
import type { ProductRepository } from "./product.repository.js";
import type { CreateProductInput, UpdateProductInput } from "./validators/product.schema.js";
import type { BatchRepository } from "./batch/batch.repository.js";
import type { PriceRepository } from "./price/price.repository.js";
import type { InventoryRepository } from "./inventory/inventory.repository.js";
import type { CertificationRepository } from "./certifications/certifications.repository.js";
import type { ManufacturerRepository } from "./manufacturer/manufacturer.repository.js";
import type { ProductDetailsWithRelations, ProductWithRelations } from "./product.types.js";
export declare class ProductService {
    private readonly productRepository;
    private readonly prisma;
    private readonly batchRepository;
    private readonly priceRepository;
    private readonly inventoryRepository;
    private readonly certificationRepository;
    private readonly manufacturerRepository;
    constructor(productRepository: ProductRepository, prisma: PrismaClient, batchRepository: BatchRepository, priceRepository: PriceRepository, inventoryRepository: InventoryRepository, certificationRepository: CertificationRepository, manufacturerRepository: ManufacturerRepository);
    create(data: CreateProductInput["body"], userId: string): Promise<Product>;
    getAll(userId: string): Promise<ProductWithRelations[]>;
    getById(id: string, userId: string): Promise<ProductDetailsWithRelations>;
    update(id: string, data: UpdateProductInput["body"], userId: string): Promise<ProductDetailsWithRelations>;
    deleteProduct(id: string): Promise<Product>;
    getAllInInvoice(ids: string[], tx?: Prisma.TransactionClient): Promise<{
        id: string;
        name: string;
        hsn: string | null;
    }[]>;
}
//# sourceMappingURL=product.service.d.ts.map