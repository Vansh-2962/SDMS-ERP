import type { Request, Response } from "express";
import type { InvoiceService } from "./invoice.service.js";
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAll: (_: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getInvoiceById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=invoice.controller.d.ts.map