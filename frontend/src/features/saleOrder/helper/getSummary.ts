import {
  IconCircleCheck,
  IconClock,
  IconShoppingCart,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { SaleOrder } from "../types/saleOrder.type";

export const getOrderSummary = (saleOrders: SaleOrder[]) => {
  const pending = saleOrders.filter(
    (c: SaleOrder) => c.status === "PENDING",
  ).length;
  const delivered = saleOrders.filter(
    (c: SaleOrder) => c.status === "DELIVERED",
  ).length;
  const dispatched = saleOrders.filter(
    (c: SaleOrder) => c.status === "DISPATCHED",
  ).length;
  const packed = saleOrders.filter(
    (c: SaleOrder) => c.status === "PACKED",
  ).length;
  const cancelled = saleOrders.filter(
    (c: SaleOrder) => c.status === "CANCELLED",
  ).length;

  const summaryCards = [
    {
      label: "Total Orders",
      value: saleOrders.length,
      bg: "bg-violet-50",
      color: "text-violet-600",
      icon: IconShoppingCart,
    },
    {
      label: "Pending",
      value: pending,
      bg: "bg-amber-50",
      color: "text-amber-600",
      icon: IconClock,
    },
    {
      label: "Dispatched",
      value: dispatched,
      bg: "bg-blue-50",
      color: "text-blue-600",
      icon: IconTruckDelivery,
    },
    {
      label: "Delivered",
      value: delivered,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
      icon: IconCircleCheck,
    },
    {
      label: "Packed",
      value: packed,
      bg: "bg-orange-50",
      color: "text-emerald-600",
      icon: IconCircleCheck,
    },
    {
      label: "Cancelled",
      value: cancelled,
      bg: "bg-olive-50",
      color: "text-olive-600",
      icon: IconShoppingCart,
    },
  ];

  return summaryCards;
};
