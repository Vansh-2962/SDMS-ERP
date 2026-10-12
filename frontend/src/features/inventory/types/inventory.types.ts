export type StockroomItemType =
  | "RAW_MATERIAL"
  | "PACKAGING_MATERIAL"
  | "OTHER";
export type InventoryAdjustmentDirection = "ADD" | "REMOVE";

export interface StockroomItem {
  id: string;
  type: StockroomItemType;
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
}

export interface StockroomItemInput {
  type: StockroomItemType;
  name: string;
  unit: string;
  currentStock: number;
  reorderLevel: number;
  purchasePrice: number;
  supplier?: string | null;
  lastPurchaseDate?: string | null;
  warehouseLocation?: string | null;
  batchNo?: string | null;
  notes?: string | null;
}

export type UpdateStockroomItemInput = Omit<
  StockroomItemInput,
  "currentStock"
>;

export interface ProductStockRow {
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
}

export interface StockAdjustmentInput {
  quantity: number;
  direction: InventoryAdjustmentDirection;
  reason: string;
}

export interface NewProductStockInput {
  warehouseLocation: string;
  currentStock: number;
  reorderLevel: number;
}
