import type { Expense } from "@/generated/prisma/client.js";

export class ExpenseMapper {
  static toResponse(expense: Expense) {
    return {
      id: expense.id,
      category: expense.category,
      description: expense.description,
      amount: Number(expense.amount),
      date: expense.date.toISOString(),
      approvedBy: expense.approvedBy,
      status: expense.status,
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    };
  }

  static toList(expenses: Expense[]) {
    return expenses.map((expense) => this.toResponse(expense));
  }
}
