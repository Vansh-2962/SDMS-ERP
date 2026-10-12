import { axiosInstance } from "@/config/axios";
import type {
  Expense,
  ExpenseInput,
  UpdateExpenseInput,
} from "../types/expense.types";

interface ExpenseResponse {
  status: boolean;
  data: Expense;
}

interface ExpenseListResponse {
  status: boolean;
  data: Expense[];
}

export async function getExpenses(): Promise<ExpenseListResponse> {
  const response = await axiosInstance.get("/expenses");
  return response.data;
}

export async function getExpense(id: string): Promise<ExpenseResponse> {
  const response = await axiosInstance.get(`/expenses/${id}`);
  return response.data;
}

export async function createExpense(
  data: ExpenseInput,
): Promise<ExpenseResponse> {
  const response = await axiosInstance.post("/expenses", data);
  return response.data;
}

export async function updateExpense(
  id: string,
  data: UpdateExpenseInput,
): Promise<ExpenseResponse> {
  const response = await axiosInstance.patch(`/expenses/${id}`, data);
  return response.data;
}

export async function deleteExpense(id: string): Promise<void> {
  await axiosInstance.delete(`/expenses/${id}`);
}
