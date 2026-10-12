import { NotFoundError } from "@/shared/errors/not-found.error.js";
import { PaymentMapper } from "./payment.mapper.js";
export class PaymentService {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async create(data) {
        if (!(await this.paymentRepository.invoiceExists(data.invoiceId))) {
            throw new NotFoundError("Invoice not found");
        }
        const paymentDate = data.status === "RECEIVED" && data.paymentDate === undefined
            ? new Date()
            : data.paymentDate;
        return this.paymentRepository.create(PaymentMapper.toCreateInput({
            ...data,
            ...(paymentDate !== undefined && { paymentDate }),
        }));
    }
    async getAll() {
        return this.paymentRepository.getAll();
    }
    async getById(id) {
        const payment = await this.paymentRepository.getById(id);
        if (!payment) {
            throw new NotFoundError("Payment not found");
        }
        return payment;
    }
    async update(id, data) {
        const existingPayment = await this.paymentRepository.getById(id);
        if (!existingPayment) {
            throw new NotFoundError("Payment not found");
        }
        if (data.invoiceId &&
            !(await this.paymentRepository.invoiceExists(data.invoiceId))) {
            throw new NotFoundError("Invoice not found");
        }
        const paymentDate = data.status === "RECEIVED" &&
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
    async delete(id) {
        const payment = await this.paymentRepository.getById(id);
        if (!payment) {
            throw new NotFoundError("Payment not found");
        }
        return this.paymentRepository.softDelete(id);
    }
}
//# sourceMappingURL=payment.service.js.map