import { EmployeeMapper } from "./mappers/employeeMapper.js";
export class EmployeeController {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    create = async (req, res) => {
        const { body } = req.validated;
        const employee = await this.employeeService.create(body);
        return res.status(201).json({
            success: true,
            message: "Employee create successfully",
            data: EmployeeMapper.toResponse(employee),
        });
    };
    fetchAllSalesman = async (req, res) => {
        const allSalesman = await this.employeeService.fetchAllSalesman();
        return res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: EmployeeMapper.toList(allSalesman),
        });
    };
    fetchAll = async (_req, res) => {
        const employees = await this.employeeService.fetchAll();
        return res.status(200).json({
            success: true,
            message: "Employees fetched successfully",
            data: EmployeeMapper.toList(employees),
        });
    };
    getById = async (req, res) => {
        const { params } = req.validated;
        const employee = await this.employeeService.getById(params.id);
        return res.status(200).json({
            success: true,
            message: "Employee fetched successfully",
            data: EmployeeMapper.toResponse(employee),
        });
    };
    update = async (req, res) => {
        const { params, body } = req.validated;
        const employee = await this.employeeService.update(params.id, body);
        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: EmployeeMapper.toResponse(employee),
        });
    };
    deactivate = async (req, res) => {
        const { params } = req.validated;
        const employee = await this.employeeService.deactivate(params.id);
        return res.status(200).json({
            success: true,
            message: "Employee deactivated successfully",
            data: EmployeeMapper.toResponse(employee),
        });
    };
}
//# sourceMappingURL=employee.controller.js.map