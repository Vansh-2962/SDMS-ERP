import type { Employee } from "@/generated/prisma/client.js";
import type { CreateEmployeeDto } from "./dto/CreateEmployee.js";
import type { EmployeeRepository } from "./employee.repository.js";
import type { UpdateEmployeeInput } from "./validators/employee.validator.js";
export declare class EmployeeService {
    private readonly employeeRepository;
    constructor(employeeRepository: EmployeeRepository);
    create(data: CreateEmployeeDto): Promise<Employee>;
    fetchAllSalesman(): Promise<Employee[]>;
    fetchAll(): Promise<Employee[]>;
    getById(id: string): Promise<Employee>;
    update(id: string, data: UpdateEmployeeInput["body"]): Promise<Employee>;
    deactivate(id: string): Promise<Employee>;
}
//# sourceMappingURL=employee.service.d.ts.map