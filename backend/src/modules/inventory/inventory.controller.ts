import type { Request, Response } from "express";
import type { InventoryService } from "./inventory.service.js";
import type {
  AdjustProductStockInput,
  AdjustStockroomItemInput,
  CreateProductStockInput,
  CreateStockroomItemInput,
  ListProductStockInput,
  StockroomItemIdInput,
  UpdateStockroomItemInput,
} from "./inventory.validators.js";
import { InventoryMapper } from "./inventory.mapper.js";

export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  createItem = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateStockroomItemInput;
    const item = await this.service.createItem(body);
    return res.status(201).json({
      status: true,
      message: "Inventory item created successfully",
      data: InventoryMapper.stockroomItem(item),
    });
  };

  getAllItems = async (_req: Request, res: Response) => {
    const items = await this.service.getAllItems();
    return res.status(200).json({
      status: true,
      message: "Inventory items fetched successfully",
      data: InventoryMapper.stockroomItems(items),
    });
  };

  getItemById = async (req: Request, res: Response) => {
    const { params } = req.validated as StockroomItemIdInput;
    const item = await this.service.getItemById(params.id);
    return res.status(200).json({
      status: true,
      message: "Inventory item fetched successfully",
      data: InventoryMapper.stockroomItem(item),
    });
  };

  updateItem = async (req: Request, res: Response) => {
    const { params, body } = req.validated as UpdateStockroomItemInput;
    const item = await this.service.updateItem(params.id, body);
    return res.status(200).json({
      status: true,
      message: "Inventory item updated successfully",
      data: InventoryMapper.stockroomItem(item),
    });
  };

  deleteItem = async (req: Request, res: Response) => {
    const { params } = req.validated as StockroomItemIdInput;
    await this.service.deleteItem(params.id);
    return res.status(200).json({
      status: true,
      message: "Inventory item deleted successfully",
      data: null,
    });
  };

  adjustItem = async (req: Request, res: Response) => {
    const { params, body } = req.validated as AdjustStockroomItemInput;
    const item = await this.service.adjustItem(params.id, body);
    return res.status(200).json({
      status: true,
      message: "Stock adjusted successfully",
      data: InventoryMapper.stockroomItem(item),
    });
  };

  getProductStocks = async (req: Request, res: Response) => {
    const { query } = req.validated as ListProductStockInput;
    const products = await this.service.getProductStocks(req.auth.userId, query);
    return res.status(200).json({
      status: true,
      message: "Product stock fetched successfully",
      data: InventoryMapper.productStocks(products),
    });
  };

  createProductStock = async (req: Request, res: Response) => {
    const { params, body } = req.validated as CreateProductStockInput;
    const stock = await this.service.createProductStock(
      params.productId,
      req.auth.userId,
      body,
    );
    return res.status(201).json({
      status: true,
      message: "Product stock row created successfully",
      data: stock,
    });
  };

  adjustProductStock = async (req: Request, res: Response) => {
    const { params, body } = req.validated as AdjustProductStockInput;
    await this.service.adjustProductStock(params.id, req.auth.userId, body);
    return res.status(200).json({
      status: true,
      message: "Product stock adjusted successfully",
      data: null,
    });
  };
}
