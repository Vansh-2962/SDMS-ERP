import { z } from "zod";

const optionalText = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().trim().max(250).nullable().optional(),
);

const paymentBody = z.object({
  invoiceId: z.string().trim().min(1, "Invoice is required"),
  amount: z.coerce.number().finite().positive("Amount must be greater than zero"),
  mode: z.enum(["CASH", "UPI", "NEFT", "CHEQUE"]),
  status: z.enum(["PENDING", "RECEIVED"]).optional(),
  paymentDate: z.coerce.date().optional(),
  utrRef: optionalText,
});

const idParams = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Payment id is required"),
  }),
});

export const createPaymentSchema = z.object({
  body: paymentBody,
});

export const updatePaymentSchema = z.object({
  ...idParams.shape,
  body: paymentBody.partial(),
});

export const paymentIdSchema = idParams;

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
export type PaymentIdInput = z.infer<typeof paymentIdSchema>;
