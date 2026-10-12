import type { StockroomItem } from "@/generated/prisma/client.js";
import type { ProductWithInventoryRows } from "./inventory.repository.js";
export declare class InventoryMapper {
    static stockroomItem(item: StockroomItem): {
        id: string;
        type: import("@/generated/prisma/client.js").StockroomItemType;
        name: string;
        unit: string;
        currentStock: number;
        reorderLevel: number;
        purchasePrice: number;
        supplier: string | null;
        lastPurchaseDate: string | null;
        warehouseLocation: string | null;
        batchNo: string | null;
        notes: string | null;
        createdAt: string;
        updatedAt: string;
    };
    static stockroomItems(items: StockroomItem[]): {
        id: string;
        type: import("@/generated/prisma/client.js").StockroomItemType;
        name: string;
        unit: string;
        currentStock: number;
        reorderLevel: number;
        purchasePrice: number;
        supplier: string | null;
        lastPurchaseDate: string | null;
        warehouseLocation: string | null;
        batchNo: string | null;
        notes: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
    static productStocks(products: ProductWithInventoryRows[]): {
        id: string;
        inventoryId: string | null;
        productId: string;
        code: string;
        name: string;
        unit: string;
        currentStock: number;
        reorderLevel: number;
        warehouseLocation: string | null;
        batchNo: string | null;
    }[];
}
//# sourceMappingURL=inventory.mapper.d.ts.map