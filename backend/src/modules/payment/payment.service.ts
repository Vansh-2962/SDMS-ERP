import { NotFoundError } from "@/shared/errors/not-found.error.js";
import type { Payment } from "@/generated/prisma/client.js";
import type {
  CreatePaymentInput,
  UpdatePaymentInput,
} from "./payment.validators.js";
import type { PaymentRepository } from "./payment.repository.js";
import { PaymentMapper } from "./payment.mapper.js";
import type { PaymentWithInvoice } from "./payment.types.js";

export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async create(data: CreatePaymentInput["body"]): Promise<PaymentWithInvoice> {
    if (!(await this.paymentRepository.invoiceExists(data.invoiceId))) {
      throw new NotFoundError("Invoice not found");
    }

    const paymentDate =
      data.status === "RECEIVED" && data.paymentDate === undefined
        ? new Date()
        : data.paymentDate;
    return this.paymentRepository.create(
      PaymentMapper.toCreateInput({
        ...data,
        ...(paymentDate !== undefined && { paymentDate }),
      }),
    );
  }

  async getAll(): Promise<PaymentWithInvoice[]> {
    return this.paymentRepository.getAll();
  }

  async getById(id: string): Promise<PaymentWithInvoice> {
    const payment = await this.paymentRepository.getById(id);
    if (!payment) {
      throw new NotFoundError("Payment not found");
    }
    return payment;
  }

  async update(
    id: string,
    data: UpdatePaymentInput["body"],
  ): Promise<PaymentWithInvoice> {
    const existingPayment = await this.paymentRepository.getById(id);
    if (!existingPayment) {
      throw new NotFoundError("Payment not found");
    }

    if (
      data.invoiceId &&
      !(await this.paymentRepository.invoiceExists(data.invoiceId))
    ) {
      throw new NotFoundError("Invoice not found");
    }

    const paymentDate =
      data.status === "RECEIVED" &&
      data.paymentDate === undefined &&
      existingPayment.paymentDate === null
        ? new Date()
        : data.paymentDate;
    const updateData = PaymentMapper.toUpdateInput({
      ...data,
      ...(paymentDate !== undefined && { paymentDate }),
    });
    return this.paymentRepository.update(id, updateData);
  }

  async delete(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.getById(id);
    if (!payment) {
      throw new NotFoundError("Payment not found");
    }
    return this.paymentRepository.softDelete(id);
  }
}
