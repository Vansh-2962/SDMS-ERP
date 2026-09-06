import { EmployeeRepository } from "./employee.repository.js";
import { prisma } from "@/config/database/prisma.js";
import { EmployeeService } from "./employee.service.js";
import { EmployeeController } from "./employee.controller.js";

export const employeeRepository = new EmployeeRepository(prisma);
export const employeeService = new EmployeeService(employeeRepository);
export const employeeController = new EmployeeController(employeeService);
