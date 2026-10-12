import type { Expense, Prisma } from "@/generated/prisma/client.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
import type { CreateExpenseInput, UpdateExpenseInput } from "./expense.validators.js";
import type { ExpenseRepository } from "./expense.repository.js";

export class ExpenseService {
  constructor(private readonly repository: ExpenseRepository) {}

  async create(data: CreateExpenseInput["body"]): Promise<Expense> {
    return this.repository.create({
      ...data,
      status: "PENDING",
    });
  }

  async getAll(): Promise<Expense[]> {
    return this.repository.getAll();
  }

  async getById(id: string): Promise<Expense> {
    const expense = await this.repository.getById(id);
    if (!expense) {
      throw new NotFoundError("Expense not found");
    }
    return expense;
  }

  async update(
    id: string,
    data: UpdateExpenseInput["body"],
    approverName: string,
  ): Promise<Expense> {
    await this.getById(id);
    const updateData: Prisma.ExpenseUpdateInput = {
      ...(data.category !== undefined && { category: data.category }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.date !== undefined && { date: data.date }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.status === "APPROVED" && { approvedBy: approverName }),
      ...(data.status === "PENDING" && { approvedBy: null }),
      ...(data.status === "REJECTED" && { approvedBy: null }),
    };

    return this.repository.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.softDelete(id);
  }
}
