export class InventoryService {
    inventoryRepository;
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async create(data, tx) {
        const inventory = await this.inventoryRepository.create(data, tx);
        return inventory;
    }
    async findInventoryById(id, tx) {
        const inventory = await this.inventoryRepository.findInventoryById(id);
        return inventory;
    }
    async getStockByProductId(productId, tx) {
        const stock = await this.inventoryRepository.getStockByProductId(productId, tx);
        return stock;
    }
    async getStockForProductIds(productIds, tx) {
        const stocks = await this.inventoryRepository.getStockForProductIds(productIds, tx);
        return stocks;
    }
    async decrementStock(inventoryId, quantity, tx) {
        const stock = await this.inventoryRepository.decrementStock(inventoryId, quantity, tx);
        return stock;
    }
}
//# sourceMappingURL=inventory.service.js.map