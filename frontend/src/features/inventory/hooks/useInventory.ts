import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  adjustProductStock,
  adjustStockroomItem,
  createProductStock,
  createStockroomItem,
  deleteStockroomItem,
  getProductStocks,
  getStockroomItems,
  updateStockroomItem,
} from "../api/inventory.api";
import type {
  NewProductStockInput,
  StockAdjustmentInput,
  StockroomItemInput,
  UpdateStockroomItemInput,
} from "../types/inventory.types";

export const inventoryItemsQueryKey = ["inventory-items"];
export const productStocksQueryKey = ["inventory-product-stocks"];

export const useGetStockroomItems = () =>
  useQuery({
    queryKey: inventoryItemsQueryKey,
    queryFn: getStockroomItems,
  });

export const useGetProductStocks = () =>
  useQuery({
    queryKey: productStocksQueryKey,
    queryFn: getProductStocks,
  });

const useInventoryMutation = <TInput, TOutput>(
  mutationFn: (input: TInput) => Promise<TOutput>,
  successMessage: string,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success(successMessage);
      void queryClient.invalidateQueries({ queryKey: inventoryItemsQueryKey });
      void queryClient.invalidateQueries({ queryKey: productStocksQueryKey });
    },
    onError: (error) => {
      const message =
        error instanceof AxiosError
          ? error.response?.data?.error?.message ??
            error.response?.data?.message
          : undefined;
      toast.error(message ?? "Inventory request failed");
    },
  });
};

export const useCreateStockroomItem = () =>
  useInventoryMutation<StockroomItemInput, unknown>(
    createStockroomItem,
    "Inventory item added",
  );

export const useUpdateStockroomItem = () =>
  useInventoryMutation<UpdateStockroomItemInput & { id: string }, unknown>(
    updateStockroomItem,
    "Inventory item updated",
  );

export const useDeleteStockroomItem = () =>
  useInventoryMutation<string, unknown>(
    deleteStockroomItem,
    "Inventory item removed",
  );

export const useAdjustStockroomItem = () =>
  useInventoryMutation<StockAdjustmentInput & { id: string }, unknown>(
    adjustStockroomItem,
    "Stock adjusted",
  );

export const useCreateProductStock = () =>
  useInventoryMutation<NewProductStockInput & { productId: string }, unknown>(
    createProductStock,
    "Product stock row created",
  );

export const useAdjustProductStock = () =>
  useInventoryMutation<
    StockAdjustmentInput & { inventoryId: string },
    unknown
  >(adjustProductStock, "Product stock adjusted");
