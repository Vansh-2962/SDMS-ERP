import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  deactivateEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
} from "../api/employee";
import type { UpdateEmployeeInput } from "../types/employee.types";

const employeeKeys = {
  all: ["employees"] as const,
  detail: (id: string) => ["employees", id] as const,
};

function invalidateEmployeeQueries(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: employeeKeys.all });
  queryClient.invalidateQueries({ queryKey: ["salesmen"] });
}

function showMutationError(error: Error, fallback: string) {
  const message =
    error instanceof AxiosError
      ? error.response?.data?.error?.message
      : undefined;
  toast.error(message ?? fallback);
}

export function useEmployees() {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: getAllEmployees,
  });
}

export function useEmployee(id: string | null) {
  return useQuery({
    queryKey: employeeKeys.detail(id ?? ""),
    queryFn: () => getEmployeeById(id!),
    enabled: Boolean(id),
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateEmployeeInput & { id: string }) =>
      updateEmployee(data),
    onSuccess: (response) => {
      invalidateEmployeeQueries(queryClient);
      queryClient.setQueryData(employeeKeys.detail(response.data.id), response);
      toast.success("Employee updated successfully");
    },
    onError: (error) => showMutationError(error, "Failed to update employee"),
  });
}

export function useDeactivateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateEmployee,
    onSuccess: () => {
      invalidateEmployeeQueries(queryClient);
      toast.success("Employee deactivated successfully");
    },
    onError: (error) => showMutationError(error, "Failed to deactivate employee"),
  });
}
