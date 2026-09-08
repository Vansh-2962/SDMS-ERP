import type {
  Inventory,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";

export class InventoryRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    data: Prisma.InventoryCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Inventory> {
    const client = tx ?? this.prisma;
    const batch = await client.inventory.create({ data });
    return batch;
  }
}
