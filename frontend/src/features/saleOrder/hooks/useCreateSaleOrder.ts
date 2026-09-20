import { useMutation } from "@tanstack/react-query";
import { createSaleOrder } from "../api/saleOrder.api";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/lib/query/query-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useCreateSaleOrder = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: createSaleOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-orders"] });
      navigate("/orders");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.error);
      } else {
        toast.error("Failed to create sale order");
      }
    },
  });
};
