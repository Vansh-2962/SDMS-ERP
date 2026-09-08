import type { Prisma, PrismaClient } from "@/generated/prisma/client.js";
import type { BatchRepository } from "./batch.repository.js";

export class BatchService {
  constructor(private readonly batchRepository: BatchRepository) {}

  async create(
    data: Prisma.ProductBatchCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    const batch = await this.batchRepository.create(data, tx);
    return batch;
  }
}
