import type { Prisma } from "@/generated/prisma/client.js";
import type { InventoryRepository } from "./inventory.repository.js";

export class InventoryService {
  constructor(private readonly inventoryRepository: InventoryRepository) {}

  async create(
    data: Prisma.InventoryCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    const inventory = await this.inventoryRepository.create(data, tx);
    return inventory;
  }
}
