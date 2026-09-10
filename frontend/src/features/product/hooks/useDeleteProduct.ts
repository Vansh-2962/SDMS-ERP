import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/product.api";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteProduct(id);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error?.message);
      } else {
        toast.error("Oops! Something went wrong. Please try again later");
      }
    },
  });
};
