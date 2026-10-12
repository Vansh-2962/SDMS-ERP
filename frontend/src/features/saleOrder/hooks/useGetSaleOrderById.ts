import { useQuery } from "@tanstack/react-query";
import { getSaleOrderById } from "../api/saleOrder.api";

export const useGetSaleOrderById = (id: string) =>
  useQuery({
    queryKey: ["sale-order", id],
    queryFn: () => getSaleOrderById(id),
    enabled: Boolean(id),
  });
