import { axiosInstance } from "@/config/axios";
import {
  ProductApiResponse,
  ProductDetails,
  ProductFormData,
} from "../types/product.types";

export const createProduct = async (data: ProductFormData) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

export const getProduct = async (id: string) => {
  const res =
    await axiosInstance.get<ProductApiResponse<ProductDetails>>(
      `/products/${id}`,
    );
  return res.data;
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: ProductFormData;
}) => {
  const res = await axiosInstance.patch(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
