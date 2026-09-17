import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "../api/customer.api";

export const useGetCustomer = (id: string) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id),
    enabled: Boolean(id),
  });
};
