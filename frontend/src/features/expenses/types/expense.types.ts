export const expenseCategories = [
  "Diesel",
  "Salary",
  "Courier",
  "Rent",
  "Electricity",
  "Packaging",
  "Marketing",
] as const;

export type ExpenseStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  approvedBy: string | null;
  status: ExpenseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseInput {
  category: string;
  description: string;
  amount: number;
  date: string;
}

export type UpdateExpenseInput = Partial<ExpenseInput> & {
  status?: ExpenseStatus;
};
