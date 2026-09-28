import { axiosInstance } from "@/config/axios";
import { CreateInvoiceFormType } from "../types/invoice.types";

export const createInvoice = async (data: CreateInvoiceFormType) => {
  const res = await axiosInstance.post(`/invoice`, data);
  return res.data;
};

export const getnvoiceById = async (id: string) => {
  const res = await axiosInstance.get(`/invoice/${id}`);
  return res.data;
};

export const getInvoiceByLabel = async (label: string) => {
  const res = await axiosInstance.get(`/invoice?label=${label}`);
  return res.data;
};

export const getInvoiceByDocNo = async (docNo: string) => {
  const res = await axiosInstance.get(`/invoice?doc=${docNo}`);
  return res.data;
};

export const getAllInvoices = async () => {
  const res = await axiosInstance.get(`/invoice`);
  return res.data;
};

export const cancelInvoice = async (id: string) => {
  const res = await axiosInstance.put(`/invoice/${id}`);
  return res.data;
};

export const updateInvoiceStatus = async (id: string, status: string) => {
  const res = await axiosInstance.put(`/invoice/${id}`, { status });
  return res.data;
};

export const updateInvoice = async (
  id: string,
  data: CreateInvoiceFormType,
) => {
  const res = await axiosInstance.put(`/invoice/${id}`, data);
  return res.data;
};
