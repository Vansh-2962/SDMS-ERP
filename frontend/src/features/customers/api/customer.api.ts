import { axiosInstance } from "@/config/axios";

export const createCustomer = async (data: any) => {
  const res = await axiosInstance.post("/customer", data);
  return res.data;
};

export const updateCustomer = async (data: any) => {
  const res = await axiosInstance.patch(`/customer/${data.id}`, data);
  return res.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await axiosInstance.delete(`/customer/${id}`);
  return res.data;
};

export const getAllCustomers = async () => {
  const res = await axiosInstance.get("/customer");
  return res.data;
};

export const getCustomerById = async (id: string) => {
  const res = await axiosInstance.get(`/customer/${id}`);
  return res.data;
};
