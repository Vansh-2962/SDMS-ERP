import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/query/query-client";
import { createInvoice } from "../api/invoice.api";

export const useCreateInvoice = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      navigate("/billing");
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.error);
      } else {
        toast.error("Failed to create invoice");
      }
    },
  });
};
