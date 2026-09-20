import { z } from "zod";

export const saleOrderItemSchema = z.object({
  gst: z.number().min(0, "GST cannot be negative"),

  price: z.number().positive("Price must be greater than 0"),

  productId: z.string().min(1, "Product is required"),

  productName: z.string().trim().min(1, "Product name is required"),

  qty: z.number().positive("Quantity must be greater than 0"),

  total: z.number().positive("Total must be greater than 0"),
});

export const saleOrderSchema = z.object({
  body: z.object({
    customerId: z.string().min(1, "Customer is required"),

    customerName: z.string().trim().min(1, "Customer name is required"),

    date: z.union([z.date(), z.string().min(1, "Date is required")]),

    items: z
      .array(saleOrderItemSchema)
      .min(1, "At least one product is required"),

    subtotal: z.number().nonnegative("Subtotal cannot be negative"),

    gstAmount: z.number().nonnegative("GST amount cannot be negative"),

    total: z.number().positive("Total must be greater than 0"),

    status: z
      .enum(["PENDING", "PACKED", "DISPATCHED", "DELIVERED"])
      .default("PENDING"),

    salesmanId: z.string().optional(),
  }),
});

export const getSaleOrderByIdSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Id is required"),
  }),
});

export const saleOrderUpdateStatusSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Id is required"),
  }),
  body: z.object({
    status: z.enum([
      "PENDING",
      "PACKED",
      "DISPATCHED",
      "DELIVERED",
      "CANCELLED",
    ]),
  }),
});

export type GetSaleOrderByIdInput = z.infer<typeof getSaleOrderByIdSchema>;
export type GetSaleOrderUpdateStatusInput = z.infer<
  typeof saleOrderUpdateStatusSchema
>;
export type SaleOrderInput = z.infer<typeof saleOrderSchema>;
export type SaleOrderItemInput = z.infer<typeof saleOrderItemSchema>;
