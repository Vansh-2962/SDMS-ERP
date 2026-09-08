import { axiosInstance } from "@/config/axios";
import { ProductFormData } from "../types/product.types";

export const createProduct = async (data: ProductFormData) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const getAllProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};
