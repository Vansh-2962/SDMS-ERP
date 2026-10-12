import { PaymentMapper } from "./payment.mapper.js";
export class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    create = async (req, res) => {
        const { body } = req.validated;
        const payment = await this.paymentService.create(body);
        return res.status(201).json({
            status: true,
            message: "Payment created successfully",
            data: PaymentMapper.toResponse(payment),
        });
    };
    getAll = async (_req, res) => {
        const payments = await this.paymentService.getAll();
        return res.status(200).json({
            status: true,
            message: "Payments fetched successfully",
            data: PaymentMapper.toList(payments),
        });
    };
    getById = async (req, res) => {
        const { params } = req.validated;
        const payment = await this.paymentService.getById(params.id);
        return res.status(200).json({
            status: true,
            message: "Payment fetched successfully",
            data: PaymentMapper.toResponse(payment),
        });
    };
    update = async (req, res) => {
        const { params, body } = req.validated;
        const payment = await this.paymentService.update(params.id, body);
        return res.status(200).json({
            status: true,
            message: "Payment updated successfully",
            data: PaymentMapper.toResponse(payment),
        });
    };
    delete = async (req, res) => {
        const { params } = req.validated;
        await this.paymentService.delete(params.id);
        return res.status(200).json({
            status: true,
            message: "Payment deleted successfully",
            data: null,
        });
    };
}
//# sourceMappingURL=payment.controller.js.map