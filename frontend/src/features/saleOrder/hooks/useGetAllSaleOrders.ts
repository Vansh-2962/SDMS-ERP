import { useQuery } from "@tanstack/react-query";
import { getAllSaleOrders } from "../api/saleOrder.api";

export const useGetAllSaleOrders = () => {
  return useQuery({
    queryKey: ["sale-orders"],
    queryFn: getAllSaleOrders,
  });
};
