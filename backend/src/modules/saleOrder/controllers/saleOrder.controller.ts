import type { Request, Response } from "express";
import type { SaleOrderService } from "../services/saleOrder.service.js";
import type { SaleOrderDTO } from "../dto/saleOrder.dto.js";
import { SaleOrderMapper } from "../mappers/saleOrder.mapper.js";
import type {
  GetSaleOrderByIdInput,
  GetSaleOrderUpdateStatusInput,
} from "../validators/saleOrder.validator.js";

export class SaleOrderController {
  constructor(private readonly saleOrderService: SaleOrderService) {}

  create = async (req: Request, res: Response) => {
    const body = req.validated["body"] as SaleOrderDTO;
    const result = await this.saleOrderService.create(body);
    return res.status(200).json({
      status: 201,
      message: "Sale Order created successfully",
      data: SaleOrderMapper.toResponse(result),
    });
  };

  getAll = async (req: Request, res: Response) => {
    const result = await this.saleOrderService.getAll();
    return res.status(201).json({
      status: 201,
      message: "Sale Orders fetched successfully",
      data: result,
    });
  };

  delete = async (req: Request, res: Response) => {
    const { params } = req.validated as GetSaleOrderByIdInput;
    const result = await this.saleOrderService.delete(params.id);
    return res.status(200).json({
      status: 200,
      message: "Sale Order deleted successfully",
      data: result,
    });
  };

  updateStatus = async (req: Request, res: Response) => {
    const { params, body } = req.validated as GetSaleOrderUpdateStatusInput;
    const result = await this.saleOrderService.updateStatus(
      params.id,
      body.status,
    );
    return res.status(200).json({
      status: 200,
      message: "Sale Order status updated successfully",
      data: result,
    });
  };
}
