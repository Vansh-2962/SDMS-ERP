import type { Request, Response } from "express";
import type { CustomerService } from "./customer.service.js";
import type { CreateCustomerDto } from "./dto/customer.dto.js";
import { CustomerMapper } from "./mapper/customer.mapper.js";

export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    create = async (req: Request, res: Response) => {
        const body = req.validated as CreateCustomerDto;
        const result = await this.customerService.create(body)
        return res.status(201).json({
            status: true,
            message: "Customer created successfully",
            data: CustomerMapper.toResponse(result)
        })
    }
}