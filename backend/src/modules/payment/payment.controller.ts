import type { Request, Response } from "express";
import type { PaymentService } from "./payment.service.js";
import type {
  CreatePaymentInput,
  PaymentIdInput,
  UpdatePaymentInput,
} from "./payment.validators.js";
import { PaymentMapper } from "./payment.mapper.js";

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  create = async (req: Request, res: Response) => {
    const { body } = req.validated as CreatePaymentInput;
    const payment = await this.paymentService.create(body);
    return res.status(201).json({
      status: true,
      message: "Payment created successfully",
      data: PaymentMapper.toResponse(payment),
    });
  };

  getAll = async (_req: Request, res: Response) => {
    const payments = await this.paymentService.getAll();
    return res.status(200).json({
      status: true,
      message: "Payments fetched successfully",
      data: PaymentMapper.toList(payments),
    });
  };

  getById = async (req: Request, res: Response) => {
    const { params } = req.validated as PaymentIdInput;
    const payment = await this.paymentService.getById(params.id);
    return res.status(200).json({
      status: true,
      message: "Payment fetched successfully",
      data: PaymentMapper.toResponse(payment),
    });
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = req.validated as UpdatePaymentInput;
    const payment = await this.paymentService.update(params.id, body);
    return res.status(200).json({
      status: true,
      message: "Payment updated successfully",
      data: PaymentMapper.toResponse(payment),
    });
  };

  delete = async (req: Request, res: Response) => {
    const { params } = req.validated as PaymentIdInput;
    await this.paymentService.delete(params.id);
    return res.status(200).json({
      status: true,
      message: "Payment deleted successfully",
      data: null,
    });
  };
}
