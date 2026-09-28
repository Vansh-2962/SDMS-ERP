import type { Inventory, Prisma } from "@/generated/prisma/client.js";
import type { InventoryRepository } from "./inventory.repository.js";
import type { Decimal } from "@/generated/prisma/internal/prismaNamespace.js";

export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async create(
    data: Prisma.InventoryCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    const inventory = await this.inventoryRepository.create(data, tx);
    return inventory;
  }

  async findInventoryById(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Inventory | null> {
    const inventory = await this.inventoryRepository.findInventoryById(id);
    return inventory;
  }

  async getStockByProductId(
    productId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<{ id: string; productId: string; currentStock: Decimal } | null> {
    const stock = await this.inventoryRepository.getStockByProductId(
      productId,
      tx,
    );
    return stock;
  }

  async getStockForProductIds(
    productIds: string[],
    tx?: Prisma.TransactionClient,
  ): Promise<
    { id: string; productId: string; currentStock: Decimal }[] | null
  > {
    const stocks = await this.inventoryRepository.getStockForProductIds(
      productIds,
      tx,
    );
    return stocks;
  }
}
