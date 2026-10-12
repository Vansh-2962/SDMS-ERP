import type { Request, Response } from "express";
import type { PaymentService } from "./payment.service.js";
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAll: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    delete: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=payment.controller.d.ts.map