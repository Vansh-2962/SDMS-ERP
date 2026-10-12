import type { Payment, Prisma, PrismaClient } from "@/generated/prisma/client.js";
import type { PaymentWithInvoice } from "./payment.types.js";
export declare class PaymentRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: Prisma.PaymentCreateInput): Promise<PaymentWithInvoice>;
    getAll(): Promise<PaymentWithInvoice[]>;
    getById(id: string): Promise<PaymentWithInvoice | null>;
    invoiceExists(id: string): Promise<boolean>;
    update(id: string, data: Prisma.PaymentUpdateInput): Promise<PaymentWithInvoice>;
    softDelete(id: string): Promise<Payment>;
}
//# sourceMappingURL=payment.repository.d.ts.map