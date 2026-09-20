export type SaleOrderItem = {
  gst: number;
  price: number;
  productId: string;
  productName: string;
  qty: number;
  total: number;
};

export type SaleOrderStatus =
  | "PENDING"
  | "PACKED"
  | "DISPATCHED"
  | "DELIVERED"
  | "CANCELLED";

export interface SaleOrderDTO {
  customerId: string;
  customerName: string;
  date: Date | string;
  items: SaleOrderItem[];
  subtotal: number;
  gstAmount: number;
  total: number;
  status: SaleOrderStatus;
  salesmanId?: string;
}
