export type DocType = "invoice" | "challan" | "proforma" | "credit" | "debit";

export interface InvoiceLineItem {
  productId: string;
  name: string;
  hsn: string;
  qty: number;
  rate: number;
  gst: number;
  discount: number;
  amount: number;
}
