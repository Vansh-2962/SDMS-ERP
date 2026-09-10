import { ProductType } from "@/features/product/types/product.types";

export const getLowStockProducts = (products: ProductType[]) => {
  const minimumStock = 10;
  const lowStocks =
    products.length > 0
      ? products.filter((product: ProductType) => product.stock <= minimumStock)
          .length
      : 0;
  return lowStocks;
};

export const getOutOfStock = (products: ProductType[]) => {
  const outOfStockCount =
    products.length > 0
      ? products.filter((product: ProductType) => product.stock <= 0).length
      : 0;
  return outOfStockCount;
};
