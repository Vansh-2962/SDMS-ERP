import type { Request, Response } from "express";
import type { ProductService } from "./product.service.js";
import type { CreateProductInput } from "./validators/product.schema.js";
import { ProductMapper } from "./mappers/product.mapper.js";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  create = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateProductInput;
    const userId = req.authorization?.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }
    const product = await this.productService.create(body, userId);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: ProductMapper.toRespoonse(product),
    });
  };

  getAll = async (req: Request, res: Response) => {
    const userId = req.auth.userId;
    const products = await this.productService.getAll(userId);
    return res.status(201).json({
      success: true,
      message: "Products fetched successfully",
      data: ProductMapper.allProductsResponse(products),
    });
  };
}
