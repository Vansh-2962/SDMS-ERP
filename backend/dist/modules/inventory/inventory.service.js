import { NotFoundError } from "@/shared/errors/not-found.error.js";
import { ConflictError } from "@/shared/errors/conflict.error.js";
export class InventoryService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    createItem(data) {
        return this.repository.createItem({
            type: data.type,
            name: data.name,
            unit: data.unit,
            currentStock: data.currentStock,
            reorderLevel: data.reorderLevel,
            purchasePrice: data.purchasePrice,
            ...(data.supplier !== undefined && { supplier: data.supplier }),
            ...(data.lastPurchaseDate !== undefined && {
                lastPurchaseDate: data.lastPurchaseDate,
            }),
            ...(data.warehouseLocation !== undefined && {
                warehouseLocation: data.warehouseLocation,
            }),
            ...(data.batchNo !== undefined && { batchNo: data.batchNo }),
            ...(data.notes !== undefined && { notes: data.notes }),
        });
    }
    getAllItems() {
        return this.repository.getAllItems();
    }
    async getItemById(id) {
        const item = await this.repository.getItemById(id);
        if (!item)
            throw new NotFoundError("Inventory item not found");
        return item;
    }
    async updateItem(id, data) {
        await this.getItemById(id);
        return this.repository.updateItem(id, {
            ...(data.type !== undefined && { type: data.type }),
            ...(data.name !== undefined && { name: data.name }),
            ...(data.unit !== undefined && { unit: data.unit }),
            ...(data.reorderLevel !== undefined && {
                reorderLevel: data.reorderLevel,
            }),
            ...(data.purchasePrice !== undefined && {
                purchasePrice: data.purchasePrice,
            }),
            ...(data.supplier !== undefined && { supplier: data.supplier }),
            ...(data.lastPurchaseDate !== undefined && {
                lastPurchaseDate: data.lastPurchaseDate,
            }),
            ...(data.warehouseLocation !== undefined && {
                warehouseLocation: data.warehouseLocation,
            }),
            ...(data.batchNo !== undefined && { batchNo: data.batchNo }),
            ...(data.notes !== undefined && { notes: data.notes }),
        });
    }
    async deleteItem(id) {
        await this.getItemById(id);
        return this.repository.softDeleteItem(id);
    }
    async adjustItem(id, data) {
        await this.getItemById(id);
        const updated = await this.repository.adjustItemStock(id, data.quantity, data.direction, data.reason);
        if (!updated) {
            throw new ConflictError("Cannot remove more stock than is currently available", "INSUFFICIENT_STOCK");
        }
        return this.getItemById(id);
    }
    getProductStocks(userId, query) {
        return this.repository.getProductStocks(userId, query.search);
    }
    async createProductStock(productId, userId, data) {
        if (!(await this.repository.productExists(productId, userId))) {
            throw new NotFoundError("Product not found");
        }
        return this.repository.createProductStock(productId, data);
    }
    async adjustProductStock(id, userId, data) {
        const updated = await this.repository.adjustProductStock(id, userId, data.quantity, data.direction, data.reason);
        if (!updated) {
            throw new NotFoundError(data.direction === "REMOVE"
                ? "Inventory row not found or insufficient stock"
                : "Product inventory row not found");
        }
        return updated;
    }
}
//# sourceMappingURL=inventory.service.js.map