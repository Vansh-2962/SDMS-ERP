import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/query/query-client";
import {
  createPayment,
  deletePayment,
  updatePayment,
} from "../api/payment.api";
import type {
  PaymentInput,
  UpdatePaymentInput,
} from "../types/payment.types";
import { paymentQueryKey } from "./useGetPayments";

const invalidatePayments = () =>
  queryClient.invalidateQueries({ queryKey: paymentQueryKey });

const showMutationError = (error: Error, action: string) => {
  const responseMessage =
    error instanceof AxiosError
      ? error.response?.data?.error?.message ?? error.response?.data?.message
      : undefined;
  toast.error(responseMessage ?? `Failed to ${action} payment`);
};

export const useCreatePayment = () =>
  useMutation({
    mutationFn: (data: PaymentInput) => createPayment(data),
    onSuccess: () => {
      toast.success("Payment created successfully");
      void invalidatePayments();
    },
    onError: (error) => showMutationError(error, "create"),
  });

export const useUpdatePayment = () =>
  useMutation({
    mutationFn: (data: UpdatePaymentInput) => updatePayment(data),
    onSuccess: () => {
      toast.success("Payment updated successfully");
      void invalidatePayments();
    },
    onError: (error) => showMutationError(error, "update"),
  });

export const useDeletePayment = () =>
  useMutation({
    mutationFn: (id: string) => deletePayment(id),
    onSuccess: () => {
      toast.success("Payment deleted successfully");
      void invalidatePayments();
    },
    onError: (error) => showMutationError(error, "delete"),
  });
