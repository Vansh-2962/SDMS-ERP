import { queryClient } from "@/lib/query/query-client";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/product.api";
import { ProductType } from "../types/product.types";

export const useGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    placeholderData: () => {
      const products = queryClient.getQueryData<any[]>(["products"]);
      return products?.find((product: ProductType) => product.id == id);
    },
  });
};
