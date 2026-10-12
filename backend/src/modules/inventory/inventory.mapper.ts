import type { StockroomItem } from "@/generated/prisma/client.js";
import type { ProductWithInventoryRows } from "./inventory.repository.js";

export class InventoryMapper {
  static stockroomItem(item: StockroomItem) {
    return {
      id: item.id,
      type: item.type,
      name: item.name,
      unit: item.unit,
      currentStock: Number(item.currentStock),
      reorderLevel: Number(item.reorderLevel),
      purchasePrice: Number(item.purchasePrice),
      supplier: item.supplier,
      lastPurchaseDate: item.lastPurchaseDate?.toISOString() ?? null,
      warehouseLocation: item.warehouseLocation,
      batchNo: item.batchNo,
      notes: item.notes,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    };
  }

  static stockroomItems(items: StockroomItem[]) {
    return items.map((item) => this.stockroomItem(item));
  }

  static productStocks(products: ProductWithInventoryRows[]) {
    return products.reduce<
      {
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
      }[]
    >((rows, product) => {
      if (product.inventories.length === 0) {
        rows.push({
            id: `no-stock-${product.id}`,
            inventoryId: null,
            productId: product.id,
            code: product.code,
            name: product.name,
            unit: product.unit,
            currentStock: 0,
            reorderLevel: 0,
            warehouseLocation: null,
            batchNo: null,
        });
        return rows;
      }

      for (const stock of product.inventories) {
        rows.push({
          id: stock.id,
          inventoryId: stock.id,
          productId: product.id,
          code: product.code,
          name: product.name,
          unit: product.unit,
          currentStock: Number(stock.currentStock),
          reorderLevel: Number(stock.reorderLevel ?? 0),
          warehouseLocation: stock.warehouseLocation,
          batchNo: stock.batch?.batchNo ?? null,
        });
      }
      return rows;
    }, []);
  }
}
