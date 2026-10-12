import type { Request, Response } from "express";
import type { EmployeeService } from "./employee.service.js";
import type {
  CreateEmployeeInput,
  EmployeeIdInput,
  UpdateEmployeeInput,
} from "./validators/employee.validator.js";
import { EmployeeMapper } from "./mappers/employeeMapper.js";

export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  create = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateEmployeeInput;
    const employee = await this.employeeService.create(body);
    return res.status(201).json({
      success: true,
      message: "Employee create successfully",
      data: EmployeeMapper.toResponse(employee),
    });
  };

  fetchAllSalesman = async (req: Request, res: Response) => {
    const allSalesman = await this.employeeService.fetchAllSalesman();
    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: EmployeeMapper.toList(allSalesman),
    });
  };

  fetchAll = async (_req: Request, res: Response) => {
    const employees = await this.employeeService.fetchAll();
    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: EmployeeMapper.toList(employees),
    });
  };

  getById = async (req: Request, res: Response) => {
    const { params } = req.validated as EmployeeIdInput;
    const employee = await this.employeeService.getById(params.id);
    return res.status(200).json({
      success: true,
      message: "Employee fetched successfully",
      data: EmployeeMapper.toResponse(employee),
    });
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = req.validated as UpdateEmployeeInput;
    const employee = await this.employeeService.update(params.id, body);
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: EmployeeMapper.toResponse(employee),
    });
  };

  deactivate = async (req: Request, res: Response) => {
    const { params } = req.validated as EmployeeIdInput;
    const employee = await this.employeeService.deactivate(params.id);
    return res.status(200).json({
      success: true,
      message: "Employee deactivated successfully",
      data: EmployeeMapper.toResponse(employee),
    });
  };
}
