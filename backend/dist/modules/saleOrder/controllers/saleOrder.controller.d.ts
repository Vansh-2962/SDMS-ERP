import type { Request, Response } from "express";
import type { SaleOrderService } from "../services/saleOrder.service.js";
export declare class SaleOrderController {
    private readonly saleOrderService;
    constructor(saleOrderService: SaleOrderService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=saleOrder.controller.d.ts.map