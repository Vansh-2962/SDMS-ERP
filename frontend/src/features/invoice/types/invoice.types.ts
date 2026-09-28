export type DocType = "invoice" | "challan" | "proforma" | "credit" | "debit";

export interface InvoiceLineItem {
  productId: string;
  name: string;
  hsn: string;
  qty: number;
  rate: number;
  stock: number;
  gst: number;
  discount: number;
  amount: number;
}

export interface CreateInvoiceItemDTO {
  productId: string;
  hsn: string;

  qty: number;
  rate: number;

  discPer: number;
  gstPer: number;
}

export interface CreateInvoiceFormType {
  label: string;

  customerId: string;

  docDate: Date;
  dueDate: Date;

  paymentTerms?: string;

  supplyType: string;
  placeOfSupply?: string;

  reverseCharge?: boolean;

  transportMode?: string;
  vehicleNo?: string;
  ewayNo?: string;

  deliveryDate?: Date;

  notes?: string;
  terms?: string;

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
