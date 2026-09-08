import type { Prisma } from "@/generated/prisma/client.js";
import type { PriceRepository } from "./price.repository.js";

export class ProductPriceService {
  constructor(private readonly priceRepository: PriceRepository) {}

  async create(
    data: Prisma.ProductPriceCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    const inventory = await this.priceRepository.create(data, tx);
    return inventory;
  }
}
