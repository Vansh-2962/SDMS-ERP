import { CustomerMapper } from "./mapper/customer.mapper.js";
import { logger } from "@/config/logger/index.js";
export class CustomerController {
    customerService;
    constructor(customerService) {
        this.customerService = customerService;
    }
    create = async (req, res) => {
        const { body } = req.validated;
        const result = await this.customerService.create(body);
        return res.status(201).json({
            status: true,
            message: "Customer created successfully",
            data: CustomerMapper.toResponse(result),
        });
    };
    update = async (req, res) => {
        const { params, body } = req.validated;
        const result = await this.customerService.update(params.id, body);
        return res.status(200).json({
            status: true,
            message: "Customer updated successfully",
            data: CustomerMapper.toResponse(result),
        });
    };
    delete = async (req, res) => {
        const { params } = req.validated;
        const result = await this.customerService.delete(params.id);
        return res.status(200).json({
            status: true,
            message: "Customer deleted successfully",
            data: result,
        });
    };
    getAll = async (_, res) => {
        const result = await this.customerService.getAll();
        return res.status(200).json({
            status: true,
            message: "Customers fetched successfully",
            data: CustomerMapper.toList(result),
        });
    };
    getById = async (req, res) => {
        const { params } = req.validated;
        const result = await this.customerService.getById(params.id);
        return res.status(200).json({
            status: true,
            message: "Customer fetched successfully",
            data: result,
        });
    };
}
//# sourceMappingURL=customer.controller.js.map