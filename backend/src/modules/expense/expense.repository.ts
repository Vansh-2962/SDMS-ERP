import type {
  Expense,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";

export class ExpenseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.ExpenseCreateInput): Promise<Expense> {
    return this.prisma.expense.create({ data });
  }

  async getAll(): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: { deletedAt: null },
      orderBy: [{ date: "desc" }, { createdAt: "desc" }],
    });
  }

  async getById(id: string): Promise<Expense | null> {
    return this.prisma.expense.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(id: string, data: Prisma.ExpenseUpdateInput): Promise<Expense> {
    return this.prisma.expense.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: string): Promise<Expense> {
    return this.prisma.expense.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
