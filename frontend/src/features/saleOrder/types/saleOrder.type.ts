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

export interface SaleOrderDetails extends Omit<
  SaleOrder,
  | "date"
  | "subtotal"
  | "gstAmount"
  | "total"
  | "customer"
  | "salesman"
  | "_count"
> {
  date: string;
  subtotal: number;
  gstAmount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
  customer: {
    id: string;
    customerCode: number;
    shopName: string;
    ownerName: string;
    type: string;
    gstNumber: string | null;
    pan: string | null;
    fssai: string | null;
    status: string;
    mobile: string;
    whatsapp: string | null;
    email: string | null;
    street: string | null;
    state: string | null;
    stateCode: string | null;
    district: string | null;
    pincode: string | null;
    latitude: string | null;
    longitude: string | null;
    salesTerritory: string | null;
    assignedSalesmanId: string | null;
    assignedSalesman: {
      empCode: number;
      fullName: string;
    } | null;
    paymentTerms: number;
    creditLimit: number;
    openingBal: number;
    createdAt: string;
    updatedAt: string;
  };
  salesman: {
    id: string;
    empCode: number;
    fullName: string;
    role: string;
    mobile: string;
    email: string | null;
  };
  items: (SaleOrderItem & {
    id: string;
    createdAt: string;
    updatedAt: string;
    product: {
      id: string;
      code: string;
      name: string;
      hsn: string | null;
      unit: string;
      netWeight: string | null;
      category: string;
      brand: string | null;
      barcode: string | null;
      type: string;
      form: string | null;
      shelfLife: number | null;
    };
  })[];
}
