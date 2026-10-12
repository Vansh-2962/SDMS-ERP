export type PaymentMode = "CASH" | "UPI" | "NEFT" | "CHEQUE";
export type PaymentStatus = "PENDING" | "RECEIVED";

export interface PaymentRecord {
  id: string;
  invoiceId: string;
  invoiceNo: string;
  customerName: string;
  amount: number;
  mode: PaymentMode;
  status: PaymentStatus;
  date: string | null;
  dueDate: string;
  utrRef: string | null;
  createdAt: string;
}

export interface PaymentInput {
  invoiceId: string;
  amount: number;
  mode: PaymentMode;
  status: PaymentStatus;
  paymentDate?: string;
  utrRef?: string | null;
}

export interface UpdatePaymentInput extends Partial<PaymentInput> {
  id: string;
}
