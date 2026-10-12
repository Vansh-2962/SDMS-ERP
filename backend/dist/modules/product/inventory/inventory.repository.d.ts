import type { Inventory, Prisma, PrismaClient } from "@/generated/prisma/client.js";
import type { Decimal } from "@/generated/prisma/internal/prismaNamespace.js";
export declare class InventoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.InventoryCreateInput, tx?: Prisma.TransactionClient): Promise<Inventory>;
    findInventoryById(id: string, tx?: Prisma.TransactionClient): Promise<Inventory | null>;
    getStockByProductId(productId: string, tx?: Prisma.TransactionClient): Promise<{
        id: string;
        productId: string;
        currentStock: Decimal;
    } | null>;
    getStockForProductIds(productIds: string[], tx?: Prisma.TransactionClient): Promise<{
        id: string;
        productId: string;
        currentStock: Decimal;
    }[] | null>;
    decrementStock(inventoryId: string, quantity: Decimal, tx?: Prisma.TransactionClient): Promise<number>;
}
//# sourceMappingURL=inventory.repository.d.ts.map