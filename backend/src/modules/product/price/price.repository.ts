import type {
  Prisma,
  PrismaClient,
  ProductPrice,
} from "@/generated/prisma/client.js";

export class PriceRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    data: Prisma.ProductPriceCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProductPrice> {
    const client = tx ?? this.prisma;
    const price = await client.productPrice.create({ data });
    return price;
  }
}
