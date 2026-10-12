import type { Prisma } from "@/generated/prisma/client.js";
import type { PaymentWithInvoice } from "./payment.types.js";
import type { CreatePaymentInput, UpdatePaymentInput } from "./payment.validators.js";
export declare class PaymentMapper {
    static toCreateInput(data: CreatePaymentInput["body"]): Prisma.PaymentCreateInput;
    static toUpdateInput(data: UpdatePaymentInput["body"]): Prisma.PaymentUpdateInput;
    static toResponse(payment: PaymentWithInvoice): {
        id: string;
        invoiceId: string;
        invoiceNo: string;
        customerName: string;
        amount: number;
        mode: import("@/generated/prisma/client.js").PaymentMode;
        status: import("@/generated/prisma/client.js").PaymentStatus;
        date: string | null;
        dueDate: string;
        utrRef: string | null;
        createdAt: string;
    };
    static toList(payments: PaymentWithInvoice[]): {
        id: string;
        invoiceId: string;
        invoiceNo: string;
        customerName: string;
        amount: number;
        mode: import("@/generated/prisma/client.js").PaymentMode;
        status: import("@/generated/prisma/client.js").PaymentStatus;
        date: string | null;
        dueDate: string;
        utrRef: string | null;
        createdAt: string;
    }[];
}
//# sourceMappingURL=payment.mapper.d.ts.map