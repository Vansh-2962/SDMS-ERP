import type { Request, Response } from "express";
import type { EmployeeService } from "./employee.service.js";
import type { CreateEmployeeInput } from "./validators/employee.validator.js";
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
    return res.status(201).json({
      success: true,
      message: "Employees fetched successfully",
      data: allSalesman,
    });
  };
}
