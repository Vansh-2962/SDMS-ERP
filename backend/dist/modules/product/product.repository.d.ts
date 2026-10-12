import type { Prisma, PrismaClient, Product } from "@/generated/prisma/client.js";
import type { ProductDetailsWithRelations, ProductWithRelations } from "./product.types.js";
export declare class ProductRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    findById(id: string): Promise<Product | null>;
    findForUser(id: string, userId: string, tx?: Prisma.TransactionClient): Promise<ProductDetailsWithRelations | null>;
    findByCode(code: string, tx?: Prisma.TransactionClient): Promise<Product | null>;
    findByBarcode(barcode: string, tx?: Prisma.TransactionClient): Promise<Product | null>;
    findAll(userId: string): Promise<ProductWithRelations[]>;
    create(data: Prisma.ProductCreateInput, tx?: Prisma.TransactionClient): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
    getAllInInvoice(ids: string[], tx?: Prisma.TransactionClient): Promise<{
        id: string;
        name: string;
        hsn: string | null;
    }[]>;
}
//# sourceMappingURL=product.repository.d.ts.map