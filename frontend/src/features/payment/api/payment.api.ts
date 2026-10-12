import { axiosInstance } from "@/config/axios";
import type {
  PaymentInput,
  PaymentRecord,
  UpdatePaymentInput,
} from "../types/payment.types";

interface PaymentResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const getPayments = async (): Promise<
  PaymentResponse<PaymentRecord[]>
> => {
  const response = await axiosInstance.get("/payment");
  return response.data;
};

export const getPaymentById = async (
  id: string,
): Promise<PaymentResponse<PaymentRecord>> => {
  const response = await axiosInstance.get(`/payment/${id}`);
  return response.data;
};

export const createPayment = async (
  data: PaymentInput,
): Promise<PaymentResponse<PaymentRecord>> => {
  const response = await axiosInstance.post("/payment", data);
  return response.data;
};

export const updatePayment = async ({
  id,
  ...data
}: UpdatePaymentInput): Promise<PaymentResponse<PaymentRecord>> => {
  const response = await axiosInstance.patch(`/payment/${id}`, data);
  return response.data;
};

export const deletePayment = async (id: string) => {
  const response = await axiosInstance.delete(`/payment/${id}`);
  return response.data;
};
