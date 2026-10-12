import { z } from "zod";

const itemType = z.enum(["RAW_MATERIAL", "PACKAGING_MATERIAL", "OTHER"]);
const nonNegativeNumber = z.coerce.number().finite().min(0);
const optionalString = (max: number) =>
  z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().trim().max(max).optional(),
  );

const stockroomItemFields = {
  type: itemType,
  name: z.string().trim().min(1).max(200),
  unit: z.string().trim().min(1).max(30),
  currentStock: nonNegativeNumber,
  reorderLevel: nonNegativeNumber,
  purchasePrice: nonNegativeNumber,
  supplier: optionalString(200),
  lastPurchaseDate: z.coerce.date().optional(),
  warehouseLocation: optionalString(120),
  batchNo: optionalString(120),
  notes: optionalString(5000),
};

const stockroomItemUpdateFields = {
  type: itemType.optional(),
  name: z.string().trim().min(1).max(200).optional(),
  unit: z.string().trim().min(1).max(30).optional(),
  reorderLevel: nonNegativeNumber.optional(),
  purchasePrice: nonNegativeNumber.optional(),
  supplier: z.string().trim().max(200).nullable().optional(),
  lastPurchaseDate: z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce.date().nullable().optional(),
  ),
  warehouseLocation: z.string().trim().max(120).nullable().optional(),
  batchNo: z.string().trim().max(120).nullable().optional(),
  notes: z.string().trim().max(5000).nullable().optional(),
};

const params = z.object({
  id: z.string().trim().min(1, "Id is required"),
});

export const createStockroomItemSchema = z.object({
  body: z.object(stockroomItemFields),
});

export const updateStockroomItemSchema = z.object({
  params,
  body: z.object(stockroomItemUpdateFields).refine(
    (body) => Object.keys(body).length > 0,
    "At least one field is required",
  ),
});

export const stockroomItemIdSchema = z.object({ params });

const stockAdjustmentFields = {
  quantity: z.coerce.number().finite().positive(),
  direction: z.enum(["ADD", "REMOVE"]),
  reason: z.string().trim().min(1).max(250),
};

export const adjustStockroomItemSchema = z.object({
  params,
  body: z.object(stockAdjustmentFields),
});

export const listProductStockSchema = z.object({
  query: z.object({
    search: z.string().trim().optional(),
  }),
});

export const createProductStockSchema = z.object({
  params: z.object({
    productId: z.string().trim().min(1),
  }),
  body: z.object({
    warehouseLocation: z.string().trim().min(1).max(120),
    currentStock: nonNegativeNumber,
    reorderLevel: nonNegativeNumber,
  }),
});

export const adjustProductStockSchema = z.object({
  params,
  body: z.object(stockAdjustmentFields),
});

export type CreateStockroomItemInput = z.infer<typeof createStockroomItemSchema>;
export type UpdateStockroomItemInput = z.infer<typeof updateStockroomItemSchema>;
export type StockroomItemIdInput = z.infer<typeof stockroomItemIdSchema>;
export type AdjustStockroomItemInput = z.infer<
  typeof adjustStockroomItemSchema
>;
export type ListProductStockInput = z.infer<typeof listProductStockSchema>;
export type CreateProductStockInput = z.infer<typeof createProductStockSchema>;
export type AdjustProductStockInput = z.infer<typeof adjustProductStockSchema>;
