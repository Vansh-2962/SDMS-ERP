import { useMutation } from "@tanstack/react-query";
import { deleteCustomer } from "../api/customer.api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/query/query-client";

export const useDeleteCustomer = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      navigate("/customers");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.error);
      } else {
        toast.error("Failed to delete customer");
      }
    },
  });
};
