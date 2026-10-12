import type { Inventory, Prisma } from "@/generated/prisma/client.js";
import type { InventoryRepository } from "./inventory.repository.js";
import type { Decimal } from "@/generated/prisma/internal/prismaNamespace.js";
export declare class InventoryService {
    private readonly inventoryRepository;
    constructor(inventoryRepository: InventoryRepository);
    create(data: Prisma.InventoryCreateInput, tx?: Prisma.TransactionClient): Promise<{
        id: string;
        productId: string;
        batchId: string | null;
        warehouseLocation: string;
        currentStock: import("@prisma/client/runtime/client").Decimal;
        reorderLevel: import("@prisma/client/runtime/client").Decimal | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
//# sourceMappingURL=inventory.service.d.ts.map