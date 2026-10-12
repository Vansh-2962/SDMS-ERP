import type { Request, Response } from "express";
import type { EmployeeService } from "./employee.service.js";
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    fetchAllSalesman: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    fetchAll: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deactivate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=employee.controller.d.ts.map