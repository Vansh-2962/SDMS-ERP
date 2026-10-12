import { z } from "zod";
export declare const createStockroomItemSchema: z.ZodObject<{
    body: z.ZodObject<{
        type: z.ZodEnum<{
            OTHER: "OTHER";
            PACKAGING_MATERIAL: "PACKAGING_MATERIAL";
            RAW_MATERIAL: "RAW_MATERIAL";
        }>;
        name: z.ZodString;
        unit: z.ZodString;
        currentStock: z.ZodCoercedNumber<unknown>;
        reorderLevel: z.ZodCoercedNumber<unknown>;
        purchasePrice: z.ZodCoercedNumber<unknown>;
        supplier: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        lastPurchaseDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        warehouseLocation: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        batchNo: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
        notes: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateStockroomItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        type: z.ZodOptional<z.ZodEnum<{
            OTHER: "OTHER";
            PACKAGING_MATERIAL: "PACKAGING_MATERIAL";
            RAW_MATERIAL: "RAW_MATERIAL";
        }>>;
        name: z.ZodOptional<z.ZodString>;
        unit: z.ZodOptional<z.ZodString>;
        reorderLevel: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        purchasePrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        supplier: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        lastPurchaseDate: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>>;
        warehouseLocation: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        batchNo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const stockroomItemIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const adjustStockroomItemSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        quantity: z.ZodCoercedNumber<unknown>;
        direction: z.ZodEnum<{
            ADD: "ADD";
            REMOVE: "REMOVE";
        }>;
        reason: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const listProductStockSchema: z.ZodObject<{
    query: z.ZodObject<{
        search: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createProductStockSchema: z.ZodObject<{
    params: z.ZodObject<{
        productId: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        warehouseLocation: z.ZodString;
        currentStock: z.ZodCoercedNumber<unknown>;
        reorderLevel: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const adjustProductStockSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        quantity: z.ZodCoercedNumber<unknown>;
        direction: z.ZodEnum<{
            ADD: "ADD";
            REMOVE: "REMOVE";
        }>;
        reason: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateStockroomItemInput = z.infer<typeof createStockroomItemSchema>;
export type UpdateStockroomItemInput = z.infer<typeof updateStockroomItemSchema>;
export type StockroomItemIdInput = z.infer<typeof stockroomItemIdSchema>;
export type AdjustStockroomItemInput = z.infer<typeof adjustStockroomItemSchema>;
export type ListProductStockInput = z.infer<typeof listProductStockSchema>;
export type CreateProductStockInput = z.infer<typeof createProductStockSchema>;
export type AdjustProductStockInput = z.infer<typeof adjustProductStockSchema>;
//# sourceMappingURL=inventory.validators.d.ts.map