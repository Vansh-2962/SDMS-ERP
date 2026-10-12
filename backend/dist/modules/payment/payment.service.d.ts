import type { Payment } from "@/generated/prisma/client.js";
import type { CreatePaymentInput, UpdatePaymentInput } from "./payment.validators.js";
import type { PaymentRepository } from "./payment.repository.js";
import type { PaymentWithInvoice } from "./payment.types.js";
export declare class PaymentService {
    private readonly paymentRepository;
    constructor(paymentRepository: PaymentRepository);
    create(data: CreatePaymentInput["body"]): Promise<PaymentWithInvoice>;
    getAll(): Promise<PaymentWithInvoice[]>;
    getById(id: string): Promise<PaymentWithInvoice>;
    update(id: string, data: UpdatePaymentInput["body"]): Promise<PaymentWithInvoice>;
    delete(id: string): Promise<Payment>;
}
//# sourceMappingURL=payment.service.d.ts.map