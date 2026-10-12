import type { Request, Response } from "express";
import type { ExpenseService } from "./expense.service.js";
export declare class ExpenseController {
    private readonly service;
    constructor(service: ExpenseService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAll: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=expense.controller.d.ts.map