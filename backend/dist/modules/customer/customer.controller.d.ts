import type { Request, Response } from "express";
import type { CustomerService } from "./customer.service.js";
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAll: (_: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=customer.controller.d.ts.map