export class PaymentMapper {
    static toCreateInput(data) {
        return {
            invoice: { connect: { id: data.invoiceId } },
            amount: data.amount,
            mode: data.mode,
            status: data.status ?? "PENDING",
            ...(data.paymentDate !== undefined && { paymentDate: data.paymentDate }),
            ...(data.utrRef !== undefined && { utrRef: data.utrRef }),
        };
    }
    static toUpdateInput(data) {
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
    static toResponse(payment) {
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
    static toList(payments) {
        return payments.map((payment) => this.toResponse(payment));
    }
}
//# sourceMappingURL=payment.mapper.js.map