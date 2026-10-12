import type { Request, Response } from "express";
import type { ProductService } from "./product.service.js";
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getAll: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    update: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=product.controller.d.ts.map