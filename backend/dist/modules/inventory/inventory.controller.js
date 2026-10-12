import { InventoryMapper } from "./inventory.mapper.js";
export class InventoryController {
    service;
    constructor(service) {
        this.service = service;
    }
    createItem = async (req, res) => {
        const { body } = req.validated;
        const item = await this.service.createItem(body);
        return res.status(201).json({
            status: true,
            message: "Inventory item created successfully",
            data: InventoryMapper.stockroomItem(item),
        });
    };
    getAllItems = async (_req, res) => {
        const items = await this.service.getAllItems();
        return res.status(200).json({
            status: true,
            message: "Inventory items fetched successfully",
            data: InventoryMapper.stockroomItems(items),
        });
    };
    getItemById = async (req, res) => {
        const { params } = req.validated;
        const item = await this.service.getItemById(params.id);
        return res.status(200).json({
            status: true,
            message: "Inventory item fetched successfully",
            data: InventoryMapper.stockroomItem(item),
        });
    };
    updateItem = async (req, res) => {
        const { params, body } = req.validated;
        const item = await this.service.updateItem(params.id, body);
        return res.status(200).json({
            status: true,
            message: "Inventory item updated successfully",
            data: InventoryMapper.stockroomItem(item),
        });
    };
    deleteItem = async (req, res) => {
        const { params } = req.validated;
        await this.service.deleteItem(params.id);
        return res.status(200).json({
            status: true,
            message: "Inventory item deleted successfully",
            data: null,
        });
    };
    adjustItem = async (req, res) => {
        const { params, body } = req.validated;
        const item = await this.service.adjustItem(params.id, body);
        return res.status(200).json({
            status: true,
            message: "Stock adjusted successfully",
            data: InventoryMapper.stockroomItem(item),
        });
    };
    getProductStocks = async (req, res) => {
        const { query } = req.validated;
        const products = await this.service.getProductStocks(req.auth.userId, query);
        return res.status(200).json({
            status: true,
            message: "Product stock fetched successfully",
            data: InventoryMapper.productStocks(products),
        });
    };
    createProductStock = async (req, res) => {
        const { params, body } = req.validated;
        const stock = await this.service.createProductStock(params.productId, req.auth.userId, body);
        return res.status(201).json({
            status: true,
            message: "Product stock row created successfully",
            data: stock,
        });
    };
    adjustProductStock = async (req, res) => {
        const { params, body } = req.validated;
        await this.service.adjustProductStock(params.id, req.auth.userId, body);
        return res.status(200).json({
            status: true,
            message: "Product stock adjusted successfully",
            data: null,
        });
    };
}
//# sourceMappingURL=inventory.controller.js.map