import type {
  InvoiceLabel,
  SupplyType,
  TransportMode,
} from "@/generated/prisma/enums.js";

export interface CreateInvoiceItemDTO {
  productId: string;
  hsn: string;

  qty: number;
  rate: number;

  discPer: number;
  gstPer: number;
  amount: number;
}

export interface CreateInvoiceDTO {
  label: InvoiceLabel;

  customerId: string;

  docDate: Date;
  dueDate: Date;

  paymentTerms?: string;

  supplyType: SupplyType;
  placeOfSupply?: string;

  reverseCharge?: boolean;

  transportMode?: TransportMode;
  vehicleNo?: string;
  ewayNo?: string;

  deliveryDate?: Date;

  notes?: string;
  terms?: string;
  billingAddress?: string;
  shippingAddress?: string;
  status?: string;

  items: CreateInvoiceItemDTO[];

  subTotal: number;
  discount?: number;
  roundOff?: number;
  taxable: number;
  grandTotal: number;
  igst: number;
  cgst: number;
  sgst: number;
}
