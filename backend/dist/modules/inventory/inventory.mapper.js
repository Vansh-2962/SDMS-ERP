export class InventoryMapper {
    static stockroomItem(item) {
        return {
            id: item.id,
            type: item.type,
            name: item.name,
            unit: item.unit,
            currentStock: Number(item.currentStock),
            reorderLevel: Number(item.reorderLevel),
            purchasePrice: Number(item.purchasePrice),
            supplier: item.supplier,
            lastPurchaseDate: item.lastPurchaseDate?.toISOString() ?? null,
            warehouseLocation: item.warehouseLocation,
            batchNo: item.batchNo,
            notes: item.notes,
            createdAt: item.createdAt.toISOString(),
            updatedAt: item.updatedAt.toISOString(),
        };
    }
    static stockroomItems(items) {
        return items.map((item) => this.stockroomItem(item));
    }
    static productStocks(products) {
        return products.reduce((rows, product) => {
            if (product.inventories.length === 0) {
                rows.push({
                    id: `no-stock-${product.id}`,
                    inventoryId: null,
                    productId: product.id,
                    code: product.code,
                    name: product.name,
                    unit: product.unit,
                    currentStock: 0,
                    reorderLevel: 0,
                    warehouseLocation: null,
                    batchNo: null,
                });
                return rows;
            }
            for (const stock of product.inventories) {
                rows.push({
                    id: stock.id,
                    inventoryId: stock.id,
                    productId: product.id,
                    code: product.code,
                    name: product.name,
                    unit: product.unit,
                    currentStock: Number(stock.currentStock),
                    reorderLevel: Number(stock.reorderLevel ?? 0),
                    warehouseLocation: stock.warehouseLocation,
                    batchNo: stock.batch?.batchNo ?? null,
                });
            }
            return rows;
        }, []);
    }
}
//# sourceMappingURL=inventory.mapper.js.map