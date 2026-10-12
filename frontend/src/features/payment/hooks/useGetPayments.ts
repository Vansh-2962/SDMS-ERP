import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../api/payment.api";

export const paymentQueryKey = ["payments"];

export const useGetPayments = () =>
  useQuery({
    queryKey: paymentQueryKey,
    queryFn: getPayments,
  });
