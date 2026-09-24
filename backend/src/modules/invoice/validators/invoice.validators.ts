import {
  InvoiceLabel,
  SupplyType,
  TransportMode,
} from "@/generated/prisma/enums.js";
import { z } from "zod";

export const invoiceItemSchema = z.object({
  productId: z.string().trim().min(1, "Product is required"),

  hsn: z
    .string()
    .trim()
    .min(1, "HSN is required")
    .max(20, "HSN cannot exceed 20 characters")
    .optional(),

  qty: z
    .number({
      error: "Quantity must be a number",
    })
    .positive("Quantity must be greater than 0"),

  rate: z
    .number({
      error: "Rate must be a number",
    })
    .nonnegative("Rate cannot be negative"),

  discPer: z
    .number({
      error: "Discount percentage must be a number",
    })
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100")
    .optional(),

  gstPer: z
    .number({
      error: "GST percentage must be a number",
    })
    .min(0, "GST cannot be negative")
    .max(100, "GST cannot exceed 100"),

  amount: z
    .number({
      error: "Amount must be a number",
    })
    .nonnegative("Amount cannot be negative"),
});

export const createInvoiceSchema = z.object({
  label: z.enum(InvoiceLabel, {
    error: "Invalid invoice label",
  }),

  customerId: z.string().trim().min(1, "Customer is required"),

  docDate: z.coerce.date({
    error: "Invalid document date",
  }),

  dueDate: z.coerce.date({
    error: "Invalid due date",
  }).optional(),

  paymentTerms: z
    .string()
    .trim()
    .max(500, "Payment terms cannot exceed 500 characters")
    .optional(),

  supplyType: z.enum(SupplyType, {
    error: "Invalid supply type",
  }),

  placeOfSupply: z
    .string()
    .trim()
    .max(100, "Place of supply cannot exceed 100 characters")
    .optional(),

  reverseCharge: z.boolean().optional().default(false),

  transportMode: z
    .enum(TransportMode, {
      error: "Invalid transport mode",
    })
    .optional(),

  vehicleNo: z
    .string()
    .trim()
    .max(50, "Vehicle number cannot exceed 50 characters")
    .optional(),

  ewayNo: z
    .string()
    .trim()
    .max(50, "E-way bill number cannot exceed 50 characters")
    .optional(),

  deliveryDate: z.coerce
    .date({
      error: "Invalid delivery date",
    })
    .optional(),

  notes: z
    .string()
    .trim()
    .max(2000, "Notes cannot exceed 2000 characters")
    .optional(),

  terms: z
    .string()
    .trim()
    .max(2000, "Terms cannot exceed 2000 characters")
    .optional(),

  items: z
    .array(invoiceItemSchema)
    .min(1, "Invoice must contain at least one item"),

  subTotal: z
    .number({
      error: "Subtotal must be a number",
    })
    .nonnegative("Subtotal cannot be negative"),

  discount: z
    .number({
      error: "Discount must be a number",
    })
    .nonnegative("Discount cannot be negative")
    .optional()
    .default(0),

  roundOff: z
    .number({
      error: "Round off must be a number",
    })
    .optional()
    .default(0),

  taxable: z
    .number({
      error: "Taxable amount must be a number",
    })
    .nonnegative("Taxable amount cannot be negative"),

  igst: z
    .number({
      error: "IGST must be a number",
    })
    .nonnegative("IGST cannot be negative"),

  sgst: z
    .number({
      error: "SGST must be a number",
    })
    .nonnegative("SGST cannot be negative"),

  cgst: z
    .number({
      error: "CGST must be a number",
    })
    .nonnegative("CGST cannot be negative"),

  grandTotal: z
    .number({
      error: "Grand total must be a number",
    })
    .nonnegative("Grand total cannot be negative"),
});
