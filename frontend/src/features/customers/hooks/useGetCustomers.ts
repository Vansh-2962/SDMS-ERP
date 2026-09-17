import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../api/customer.api";

export const useGetCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getAllCustomers,
  });
};
