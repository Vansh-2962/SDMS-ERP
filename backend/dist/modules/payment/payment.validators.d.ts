import { z } from "zod";
export declare const createPaymentSchema: z.ZodObject<{
    body: z.ZodObject<{
        invoiceId: z.ZodString;
        amount: z.ZodCoercedNumber<unknown>;
        mode: z.ZodEnum<{
            CASH: "CASH";
            CHEQUE: "CHEQUE";
            NEFT: "NEFT";
            UPI: "UPI";
        }>;
        status: z.ZodOptional<z.ZodEnum<{
            PENDING: "PENDING";
            RECEIVED: "RECEIVED";
        }>>;
        paymentDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        utrRef: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updatePaymentSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        invoiceId: z.ZodOptional<z.ZodString>;
        amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        mode: z.ZodOptional<z.ZodEnum<{
            CASH: "CASH";
            CHEQUE: "CHEQUE";
            NEFT: "NEFT";
            UPI: "UPI";
        }>>;
        status: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
            PENDING: "PENDING";
            RECEIVED: "RECEIVED";
        }>>>;
        paymentDate: z.ZodOptional<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
        utrRef: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const paymentIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
export type PaymentIdInput = z.infer<typeof paymentIdSchema>;
//# sourceMappingURL=payment.validators.d.ts.map