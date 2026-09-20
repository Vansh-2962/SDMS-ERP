import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus } from "../api/saleOrder.api";

import { queryClient } from "@/lib/query/query-client";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useUpdateOrderStatus = () => {
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sale-orders"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data?.error);
      } else {
        toast.error("Failed to update order status");
      }
    },
  });
};
