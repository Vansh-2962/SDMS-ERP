import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmployee } from "../api/employee";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesmen"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error?.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });
};
