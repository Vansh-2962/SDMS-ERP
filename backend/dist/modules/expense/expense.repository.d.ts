import type { Expense, Prisma, PrismaClient } from "@/generated/prisma/client.js";
export declare class ExpenseRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.ExpenseCreateInput): Promise<Expense>;
    getAll(): Promise<Expense[]>;
    getById(id: string): Promise<Expense | null>;
    update(id: string, data: Prisma.ExpenseUpdateInput): Promise<Expense>;
    softDelete(id: string): Promise<Expense>;
}
//# sourceMappingURL=expense.repository.d.ts.map