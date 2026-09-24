import {
  IconFileInvoice,
  IconFileText,
  IconReceiptOff,
  IconReceiptRefund,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { DocType } from "../types/invoice.types";


export const DOC_CONFIG: Record<
  DocType,
  { label: string; prefix: string; icon: typeof IconFileInvoice; color: string }
> = {
  invoice: {
    label: "Tax Invoice",
    prefix: "INV",
    icon: IconFileInvoice,
    color: "text-violet-600 bg-violet-50",
  },
  challan: {
    label: "Delivery Challan",
    prefix: "DC",
    icon: IconTruckDelivery,
    color: "text-blue-600 bg-blue-50",
  },
  proforma: {
    label: "Proforma Invoice",
    prefix: "PI",
    icon: IconFileText,
    color: "text-emerald-600 bg-emerald-50",
  },
  credit: {
    label: "Credit Note",
    prefix: "CN",
    icon: IconReceiptRefund,
    color: "text-amber-600 bg-amber-50",
  },
  debit: {
    label: "Debit Note",
    prefix: "DN",
    icon: IconReceiptOff,
    color: "text-rose-600 bg-rose-50",
  },
};
