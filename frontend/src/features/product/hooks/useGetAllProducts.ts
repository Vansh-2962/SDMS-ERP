import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/product.api";

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
};
