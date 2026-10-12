import { z } from "zod";
export declare const createExpenseSchema: z.ZodObject<{
    body: z.ZodObject<{
        category: z.ZodString;
        description: z.ZodString;
        amount: z.ZodCoercedNumber<unknown>;
        date: z.ZodCoercedDate<unknown>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateExpenseSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        date: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        status: z.ZodOptional<z.ZodEnum<{
            APPROVED: "APPROVED";
            PENDING: "PENDING";
            REJECTED: "REJECTED";
        }>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const expenseIdSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>;
export type ExpenseIdInput = z.infer<typeof expenseIdSchema>;
//# sourceMappingURL=expense.validators.d.ts.map