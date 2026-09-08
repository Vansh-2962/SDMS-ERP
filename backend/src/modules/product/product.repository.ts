import type {
  Prisma,
  PrismaClient,
  Product,
} from "@/generated/prisma/client.js";
import type { CreateProductInput } from "./validators/product.schema.js";
import type { ProductWithRelations } from "./product.types.js";

export class ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async findByCode(
    code: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Product | null> {
    const client = tx ? tx : this.prisma;
    return client.product.findUnique({
      where: {
        code,
      },
    });
  }

  async findByBarcode(
    barcode: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Product | null> {
    const client = tx ? tx : this.prisma;
    return client.product.findUnique({
      where: {
        barcode,
      },
    });
  }

  async findAll(userId: string): Promise<ProductWithRelations[]> {
    return this.prisma.product.findMany({
      where: {
        createdById: userId,
      },
      include: {
        prices: true,
        batches: true,
        inventories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async create(
    data: Prisma.ProductCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Product> {
    const client = tx ? tx : this.prisma;
    return client.product.create({ data });
  }
}
