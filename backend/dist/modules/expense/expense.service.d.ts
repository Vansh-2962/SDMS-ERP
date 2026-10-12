import type { Expense } from "@/generated/prisma/client.js";
import type { CreateExpenseInput, UpdateExpenseInput } from "./expense.validators.js";
import type { ExpenseRepository } from "./expense.repository.js";
export declare class ExpenseService {
    private readonly repository;
    constructor(repository: ExpenseRepository);
    create(data: CreateExpenseInput["body"]): Promise<Expense>;
    getAll(): Promise<Expense[]>;
    getById(id: string): Promise<Expense>;
    update(id: string, data: UpdateExpenseInput["body"], approverName: string): Promise<Expense>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=expense.service.d.ts.map