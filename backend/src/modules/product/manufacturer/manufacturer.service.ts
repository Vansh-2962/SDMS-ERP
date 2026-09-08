import type { Inventory, Prisma } from "@/generated/prisma/client.js";
import type { ManufacturerRepository } from "./manufacturer.repository.js";

export class ManufacturerService {
  constructor(
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}

  async create(
    data: Prisma.ManufacturerCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    const inventory = await this.manufacturerRepository.create(data, tx);
    return inventory;
  }

  async attachToProduct(
    productId: string,
    manufacturerId: string,
    tx?: Prisma.TransactionClient,
  ) {
    const prodManufacturer = await this.manufacturerRepository.attachToProduct(
      productId,
      manufacturerId,
      tx,
    );
    return prodManufacturer;
  }
}
