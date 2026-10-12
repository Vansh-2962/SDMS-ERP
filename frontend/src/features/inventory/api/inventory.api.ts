import { axiosInstance } from "@/config/axios";
import type {
  NewProductStockInput,
  ProductStockRow,
  StockAdjustmentInput,
  StockroomItem,
  StockroomItemInput,
  UpdateStockroomItemInput,
} from "../types/inventory.types";

interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export const getStockroomItems = async (): Promise<
  ApiResponse<StockroomItem[]>
> => {
  const response = await axiosInstance.get("/inventory");
  return response.data;
};

export const getStockroomItem = async (
  id: string,
): Promise<ApiResponse<StockroomItem>> => {
  const response = await axiosInstance.get(`/inventory/${id}`);
  return response.data;
};

export const createStockroomItem = async (
  data: StockroomItemInput,
): Promise<ApiResponse<StockroomItem>> => {
  const response = await axiosInstance.post("/inventory", data);
  return response.data;
};

export const updateStockroomItem = async ({
  id,
  ...data
}: UpdateStockroomItemInput & {
  id: string;
}): Promise<ApiResponse<StockroomItem>> => {
  const response = await axiosInstance.patch(`/inventory/${id}`, data);
  return response.data;
};

export const deleteStockroomItem = async (id: string) => {
  const response = await axiosInstance.delete(`/inventory/${id}`);
  return response.data;
};

export const adjustStockroomItem = async ({
  id,
  ...data
}: StockAdjustmentInput & { id: string }): Promise<ApiResponse<StockroomItem>> => {
  const response = await axiosInstance.patch(`/inventory/${id}/adjust`, data);
  return response.data;
};

export const getProductStocks = async (): Promise<
  ApiResponse<ProductStockRow[]>
> => {
  const response = await axiosInstance.get("/inventory/products");
  return response.data;
};

export const createProductStock = async ({
  productId,
  ...data
}: NewProductStockInput & { productId: string }) => {
  const response = await axiosInstance.post(
    `/inventory/products/${productId}/stock`,
    data,
  );
  return response.data;
};

export const adjustProductStock = async ({
  inventoryId,
  ...data
}: StockAdjustmentInput & { inventoryId: string }) => {
  const response = await axiosInstance.patch(
    `/inventory/products/stock/${inventoryId}`,
    data,
  );
  return response.data;
};
