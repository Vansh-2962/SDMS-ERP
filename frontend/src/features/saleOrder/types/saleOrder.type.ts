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

export interface SaleOrderFormData {
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

export interface SaleOrder {
  id: string;
  saleOrderCode: number;
  customerId: string;
  customerName: string;
  date: Date | string;
  subtotal: string;
  gstAmount: string;
  total: string;
  status: SaleOrderStatus;
  salesmanId: string;
  isActive: true;
  createdAt: Date | string;
  updatedAt: Date | string;
  _count: {
    items: number;
  };
  salesman: {
    fullName: string;
  };
  customer: {
    shopName: string;
  };
}
