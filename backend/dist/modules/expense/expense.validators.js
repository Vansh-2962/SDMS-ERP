import { z } from "zod";
const expenseFields = {
    category: z.string().trim().min(1).max(100),
    description: z.string().trim().min(1).max(500),
    amount: z.coerce.number().finite().positive("Amount must be greater than zero"),
    date: z.coerce.date(),
};
const idParams = z.object({
    id: z.string().trim().min(1, "Expense id is required"),
});
export const createExpenseSchema = z.object({
    body: z.object(expenseFields),
});
export const updateExpenseSchema = z.object({
    params: idParams,
    body: z
        .object({
        category: expenseFields.category.optional(),
        description: expenseFields.description.optional(),
        amount: expenseFields.amount.optional(),
        date: expenseFields.date.optional(),
        status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    })
        .refine((body) => Object.keys(body).length > 0, "At least one field is required"),
});
export const expenseIdSchema = z.object({ params: idParams });
//# sourceMappingURL=expense.validators.js.map