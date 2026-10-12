import type { Prisma } from "@/generated/prisma/client.js";
import type { PaymentWithInvoice } from "./payment.types.js";
import type {
  CreatePaymentInput,
  UpdatePaymentInput,
} from "./payment.validators.js";

export class PaymentMapper {
  static toCreateInput(
    data: CreatePaymentInput["body"],
  ): Prisma.PaymentCreateInput {
    return {
      invoice: { connect: { id: data.invoiceId } },
      amount: data.amount,
      mode: data.mode,
      status: data.status ?? "PENDING",
      ...(data.paymentDate !== undefined && { paymentDate: data.paymentDate }),
      ...(data.utrRef !== undefined && { utrRef: data.utrRef }),
    };
  }

  static toUpdateInput(
    data: UpdatePaymentInput["body"],
  ): Prisma.PaymentUpdateInput {
    return {
      ...(data.invoiceId !== undefined && {
        invoice: { connect: { id: data.invoiceId } },
      }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.mode !== undefined && { mode: data.mode }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.paymentDate !== undefined && { paymentDate: data.paymentDate }),
      ...(data.utrRef !== undefined && { utrRef: data.utrRef }),
    };
  }

  static toResponse(payment: PaymentWithInvoice) {
    return {
      id: payment.id,
      invoiceId: payment.invoiceId,
      invoiceNo: payment.invoice.docNo,
      customerName: payment.invoice.customer.shopName,
      amount: Number(payment.amount),
      mode: payment.mode,
      status: payment.status,
      date: payment.paymentDate?.toISOString() ?? null,
      dueDate: payment.invoice.dueDate.toISOString(),
      utrRef: payment.utrRef,
      createdAt: payment.createdAt.toISOString(),
    };
  }

  static toList(payments: PaymentWithInvoice[]) {
    return payments.map((payment) => this.toResponse(payment));
  }
}
