import type {
  Prisma,
  PrismaClient,
  ProductBatch,
} from "@/generated/prisma/client.js";

export class BatchRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    data: Prisma.ProductBatchCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProductBatch> {
    const client = tx ?? this.prisma;
    const batch = await client.productBatch.create({ data });
    return batch;
  }
}
