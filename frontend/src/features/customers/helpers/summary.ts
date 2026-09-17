import {
  IconBuildingStore,
  IconBuildingWarehouse,
  IconShoppingBag,
  IconTruckDelivery,
  IconUsers,
} from "@tabler/icons-react";
import { Customer } from "../types/customer.types";

export const getSummary = (allCustomers: Customer[]) => {
  const distributors = allCustomers.filter(
    (c: Customer) => c.type === "DISTRIBUTOR",
  ).length;
  const superStockist = allCustomers.filter(
    (c: Customer) => c.type === "SUPER_STOCKIST",
  ).length;
  const retailers = allCustomers.filter(
    (c: Customer) => c.type === "RETAILER",
  ).length;
  const wholesalers = allCustomers.filter(
    (c: Customer) => c.type === "WHOLESALER",
  ).length;
  const modernTraders = allCustomers.filter(
    (c: Customer) => c.type === "MODERN_TRADE",
  ).length;

  const summaryCards = [
    {
      label: "Distributors",
      count: distributors || 0,
      icon: IconTruckDelivery,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Super Stockists",
      count: superStockist || 0,
      icon: IconBuildingWarehouse,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Retailers",
      count: retailers || 0,
      icon: IconBuildingStore,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Wholesalers",
      count: wholesalers || 0,
      icon: IconShoppingBag,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Modern Trade",
      count: modernTraders || 0,
      icon: IconUsers,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return summaryCards;
};
