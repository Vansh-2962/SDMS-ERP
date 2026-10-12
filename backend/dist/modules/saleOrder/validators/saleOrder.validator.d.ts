import { z } from "zod";
export declare const saleOrderItemSchema: z.ZodObject<{
    gst: z.ZodNumber;
    price: z.ZodNumber;
    productId: z.ZodString;
    productName: z.ZodString;
    qty: z.ZodNumber;
    total: z.ZodNumber;
}, z.core.$strip>;
export declare const saleOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        customerId: z.ZodString;
        customerName: z.ZodString;
        date: z.ZodUnion<readonly [z.ZodDate, z.ZodString]>;
        items: z.ZodArray<z.ZodObject<{
            gst: z.ZodNumber;
            price: z.ZodNumber;
            productId: z.ZodString;
            productName: z.ZodString;
            qty: z.ZodNumber;
            total: z.ZodNumber;
        }, z.core.$strip>>;
        subtotal: z.ZodNumber;
        gstAmount: z.ZodNumber;
        total: z.ZodNumber;
        status: z.ZodDefault<z.ZodEnum<{
            DELIVERED: "DELIVERED";
            DISPATCHED: "DISPATCHED";
            PACKED: "PACKED";
            PENDING: "PENDING";
        }>>;
        salesmanId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getSaleOrderByIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const saleOrderUpdateStatusSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        status: z.ZodEnum<{
            CANCELLED: "CANCELLED";
            DELIVERED: "DELIVERED";
            DISPATCHED: "DISPATCHED";
            PACKED: "PACKED";
            PENDING: "PENDING";
        }>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type GetSaleOrderByIdInput = z.infer<typeof getSaleOrderByIdSchema>;
export type GetSaleOrderUpdateStatusInput = z.infer<typeof saleOrderUpdateStatusSchema>;
export type SaleOrderInput = z.infer<typeof saleOrderSchema>;
export type SaleOrderItemInput = z.infer<typeof saleOrderItemSchema>;
//# sourceMappingURL=saleOrder.validator.d.ts.map