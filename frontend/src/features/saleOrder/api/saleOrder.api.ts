import { axiosInstance } from "@/config/axios";
import {
  SaleOrderDetails,
  SaleOrderFormData,
  SaleOrderStatus,
} from "../types/saleOrder.type";

export const createSaleOrder = async (data: SaleOrderFormData) => {
  const res = await axiosInstance.post("/sale-order", data);
  return res.data;
};

export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: string;
  status: SaleOrderStatus;
}) => {
  const res = await axiosInstance.put(`/sale-order/${id}`, { status });
  return res.data;
};

export const getAllSaleOrders = async () => {
  const res = await axiosInstance.get("/sale-order");
  return res.data;
};

export const getSaleOrderById = async (id: string) => {
  const res = await axiosInstance.get<{ data: SaleOrderDetails }>(
    `/sale-order/${id}`,
  );
  return res.data;
};
