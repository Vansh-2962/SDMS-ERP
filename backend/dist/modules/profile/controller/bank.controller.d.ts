import type { Request, Response } from "express";
import type { BankService } from "@/modules/profile/services/bank.service.js";
export declare class BankController {
    private readonly bankService;
    constructor(bankService: BankService);
    createOrUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getBankDetails: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=bank.controller.d.ts.map