import type { Request, Response } from "express";
import type { InventoryService } from "./inventory.service.js";
export declare class InventoryController {
    private readonly service;
    constructor(service: InventoryService);
    createItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAllItems: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getItemById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    updateItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    adjustItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProductStocks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    createProductStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    adjustProductStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=inventory.controller.d.ts.map