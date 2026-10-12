import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/employee";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["salesmen"] });
      toast.success("Employee created successfully");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error?.message ?? "Failed to create employee");
      } else {
        toast.error("Failed to create employee");
      }
    },
  });
};
