import type { Inventory, Prisma, PrismaClient, StockroomItem } from "@/generated/prisma/client.js";
declare const productStockInclude: {
    inventories: {
        include: {
            batch: {
                select: {
                    batchNo: true;
                };
            };
        };
        orderBy: {
            createdAt: "asc";
        };
    };
};
export type ProductWithInventoryRows = Prisma.ProductGetPayload<{
    include: typeof productStockInclude;
}>;
export declare class InventoryRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    createItem(data: Prisma.StockroomItemCreateInput): Promise<StockroomItem>;
    getAllItems(): Promise<StockroomItem[]>;
    getItemById(id: string): Promise<StockroomItem | null>;
    updateItem(id: string, data: Prisma.StockroomItemUpdateInput): Promise<StockroomItem>;
    softDeleteItem(id: string): Promise<StockroomItem>;
    adjustItemStock(id: string, quantity: number, direction: "ADD" | "REMOVE", reason: string): Promise<number>;
    getProductStocks(userId: string, search?: string): Promise<ProductWithInventoryRows[]>;
    createProductStock(productId: string, data: {
        warehouseLocation: string;
        currentStock: number;
        reorderLevel: number;
    }): Promise<Inventory>;
    productExists(productId: string, userId: string): Promise<boolean>;
    adjustProductStock(id: string, userId: string, quantity: number, direction: "ADD" | "REMOVE", reason: string): Promise<number>;
}
export {};
//# sourceMappingURL=inventory.repository.d.ts.map