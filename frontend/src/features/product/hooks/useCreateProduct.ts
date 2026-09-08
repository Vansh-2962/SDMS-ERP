import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/product.api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error?.message);
        return;
      } else {
        toast.error("Oops! Something went wrong. Please try again later");
      }
    },
  });
};
