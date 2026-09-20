import {
  IconCircleCheck,
  IconClock,
  IconPackage,
  IconTruckDelivery,
  IconX,
} from "@tabler/icons-react";
import { SaleOrderStatus } from "../types/saleOrder.type";

export const statusConfig: Record<
  SaleOrderStatus,
  { color: string; icon: any }
> = {
  PENDING: { color: "bg-amber-100 text-amber-700", icon: IconClock },
  PACKED: { color: "bg-blue-100 text-blue-700", icon: IconPackage },
  DISPATCHED: {
    color: "bg-violet-100 text-violet-700",
    icon: IconTruckDelivery,
  },
  DELIVERED: {
    color: "bg-emerald-100 text-emerald-700",
    icon: IconCircleCheck,
  },
  CANCELLED: { color: "bg-red-100 text-red-700", icon: IconX },
};
