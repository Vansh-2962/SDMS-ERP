import type { Expense } from "@/generated/prisma/client.js";
export declare class ExpenseMapper {
    static toResponse(expense: Expense): {
        id: string;
        category: string;
        description: string;
        amount: number;
        date: string;
        approvedBy: string | null;
        status: import("@/generated/prisma/client.js").ExpenseStatus;
        createdAt: string;
        updatedAt: string;
    };
    static toList(expenses: Expense[]): {
        id: string;
        category: string;
        description: string;
        amount: number;
        date: string;
        approvedBy: string | null;
        status: import("@/generated/prisma/client.js").ExpenseStatus;
        createdAt: string;
        updatedAt: string;
    }[];
}
//# sourceMappingURL=expense.mapper.d.ts.map