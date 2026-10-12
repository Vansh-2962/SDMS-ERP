import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../api/expense.api";
import type {
  ExpenseInput,
  UpdateExpenseInput,
} from "../types/expense.types";

export const expenseQueryKey = ["expenses"] as const;

function invalidateExpenses(queryClient: ReturnType<typeof useQueryClient>) {
  void queryClient.invalidateQueries({ queryKey: expenseQueryKey });
}

function showMutationError(error: Error, action: string) {
  const responseMessage =
    error instanceof AxiosError
      ? error.response?.data?.error?.message ?? error.response?.data?.message
      : undefined;
  toast.error(responseMessage ?? `Failed to ${action} expense`);
}

export function useExpenses() {
  return useQuery({
    queryKey: expenseQueryKey,
    queryFn: getExpenses,
  });
}

export function useExpense(id: string | null) {
  return useQuery({
    queryKey: [...expenseQueryKey, id],
    queryFn: () => getExpense(id!),
    enabled: Boolean(id),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ExpenseInput) => createExpense(data),
    onSuccess: () => {
      toast.success("Expense created successfully");
      invalidateExpenses(queryClient);
    },
    onError: (error) => showMutationError(error, "create"),
  });
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: UpdateExpenseInput & { id: string }) => updateExpense(id, data),
    onSuccess: () => {
      toast.success("Expense updated successfully");
      invalidateExpenses(queryClient);
    },
    onError: (error) => showMutationError(error, "update"),
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteExpense(id),
    onSuccess: () => {
      toast.success("Expense deleted successfully");
      invalidateExpenses(queryClient);
    },
    onError: (error) => showMutationError(error, "delete"),
  });
}
