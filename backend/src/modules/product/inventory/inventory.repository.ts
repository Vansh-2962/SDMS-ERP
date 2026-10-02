import type {
  Inventory,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";
import type {
  Decimal,
  NumberSequenceAvgAggregateInputType,
} from "@/generated/prisma/internal/prismaNamespace.js";

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

  async findInventoryById(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Inventory | null> {
    const client = tx ? tx : this.prisma;
    const result = await client.inventory.findFirst({
      where: {
        id,
      },
      orderBy: {
        currentStock: "desc",
      },
    });
    return result;
  }

  async getStockByProductId(
    productId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<{ id: string; productId: string; currentStock: Decimal } | null> {
    const client = tx ? tx : this.prisma;
    const result = await client.inventory.findFirst({
      where: {
        productId,
      },
      select: {
        id: true,
        productId: true,
        currentStock: true,
      },
    });
    return result;
  }

  async getStockForProductIds(
    productIds: string[],
    tx?: Prisma.TransactionClient,
  ): Promise<
    { id: string; productId: string; currentStock: Decimal }[] | null
  > {
    const client = tx ? tx : this.prisma;
    const result = await client.inventory.findMany({
      where: {
        productId: {
          in: productIds,
        },
      },
      select: {
        id: true,
        productId: true,
        currentStock: true,
      },
    });
    return result;
  }

  async decrementStock(
    inventoryId: string,
    quantity: Decimal,
    tx?: Prisma.TransactionClient,
  ): Promise<number> {
    const client = tx ? tx : this.prisma;
    const result = await client.inventory.updateMany({
      where: {
        id: inventoryId,
        currentStock: {
          gte: quantity,
        },
      },
      data: {
        currentStock: {
          decrement: quantity,
        },
      },
    });
    return result.count;
  }
}
