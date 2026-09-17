import type { Request, Response } from "express";
import type { CustomerService } from "./customer.service.js";
import type { CreateCustomerDto } from "./dto/customer.dto.js";
import { CustomerMapper } from "./mapper/customer.mapper.js";
import type { Customer } from "@/generated/prisma/client.js";
import { logger } from "@/config/logger/index.js";
import type { CustomerWithSalesman } from "./customer.types.js";
import type {
  DeleteCustomerInput,
  GetCustomerByIdInput,
} from "./validators/customer.validator.js";

export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  create = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateCustomerDto;
    const result = await this.customerService.create(body);
    return res.status(201).json({
      status: true,
      message: "Customer created successfully",
      data: CustomerMapper.toResponse(result),
    });
  };

  delete = async (req: Request, res: Response) => {
    const { params } = req.validated as DeleteCustomerInput;
    const result = await this.customerService.delete(params.id);
    return res.status(200).json({
      status: true,
      message: "Customer deleted successfully",
      data: result,
    });
  };

  getAll = async (_: Request, res: Response) => {
    const result = await this.customerService.getAll();
    return res.status(200).json({
      status: true,
      message: "Customers fetched successfully",
      data: CustomerMapper.toList(result as CustomerWithSalesman[]),
    });
  };

  getById = async (req: Request, res: Response) => {
    const { params } = req.validated as GetCustomerByIdInput;
    const result = await this.customerService.getById(params.id);
    return res.status(200).json({
      status: true,
      message: "Customer fetched successfully",
      data: result,
    });
  };
}
