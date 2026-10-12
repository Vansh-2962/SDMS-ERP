import type {
  Inventory,
  Prisma,
  PrismaClient,
  StockroomItem,
} from "@/generated/prisma/client.js";

const productStockInclude = {
  inventories: {
    include: {
      batch: {
        select: { batchNo: true },
      },
    },
    orderBy: { createdAt: "asc" },
  },
} satisfies Prisma.ProductInclude;

export type ProductWithInventoryRows = Prisma.ProductGetPayload<{
  include: typeof productStockInclude;
}>;

export class InventoryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createItem(
    data: Prisma.StockroomItemCreateInput,
  ): Promise<StockroomItem> {
    return this.prisma.stockroomItem.create({ data });
  }

  async getAllItems(): Promise<StockroomItem[]> {
    return this.prisma.stockroomItem.findMany({
      where: { deletedAt: null },
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
  }

  async getItemById(id: string): Promise<StockroomItem | null> {
    return this.prisma.stockroomItem.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async updateItem(
    id: string,
    data: Prisma.StockroomItemUpdateInput,
  ): Promise<StockroomItem> {
    return this.prisma.stockroomItem.update({
      where: { id },
      data,
    });
  }

  async softDeleteItem(id: string): Promise<StockroomItem> {
    return this.prisma.stockroomItem.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async adjustItemStock(
    id: string,
    quantity: number,
    direction: "ADD" | "REMOVE",
    reason: string,
  ): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      const result = await tx.stockroomItem.updateMany({
        where: {
          id,
          deletedAt: null,
          ...(direction === "REMOVE" && { currentStock: { gte: quantity } }),
        },
        data: {
          currentStock:
            direction === "ADD"
              ? { increment: quantity }
              : { decrement: quantity },
        },
      });
      if (result.count) {
        await tx.inventoryAdjustment.create({
          data: {
            stockroomItemId: id,
            quantity,
            direction,
            reason,
          },
        });
      }
      return result.count;
    });
  }

  async getProductStocks(
    userId: string,
    search?: string,
  ): Promise<ProductWithInventoryRows[]> {
    return this.prisma.product.findMany({
      where: {
        createdById: userId,
        ...(search && {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { code: { contains: search, mode: "insensitive" } },
            ],
        }),
      },
      include: productStockInclude,
      orderBy: { name: "asc" },
    });
  }

  async createProductStock(
    productId: string,
    data: {
      warehouseLocation: string;
      currentStock: number;
      reorderLevel: number;
    },
  ): Promise<Inventory> {
    return this.prisma.inventory.create({
      data: {
        product: { connect: { id: productId } },
        warehouseLocation: data.warehouseLocation,
        currentStock: data.currentStock,
        reorderLevel: data.reorderLevel,
      },
    });
  }

  async productExists(productId: string, userId: string): Promise<boolean> {
    const product = await this.prisma.product.findUnique({
      where: { id: productId, createdById: userId },
      select: { id: true },
    });
    return product !== null;
  }

  async adjustProductStock(
    id: string,
    userId: string,
    quantity: number,
    direction: "ADD" | "REMOVE",
    reason: string,
  ): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      const result = await tx.inventory.updateMany({
        where: {
          id,
          product: { is: { createdById: userId } },
          ...(direction === "REMOVE" && { currentStock: { gte: quantity } }),
        },
        data: {
          currentStock:
            direction === "ADD"
              ? { increment: quantity }
              : { decrement: quantity },
        },
      });
      if (result.count) {
        await tx.inventoryAdjustment.create({
          data: {
            inventoryId: id,
            quantity,
            direction,
            reason,
          },
        });
      }
      return result.count;
    });
  }
}
