import { useQuery } from "@tanstack/react-query";
import { getAllInvoices } from "../api/invoice.api";

export const useGetInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: getAllInvoices,
  });
};
