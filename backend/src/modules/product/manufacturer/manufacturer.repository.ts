import type {
  Inventory,
  Manufacturer,
  Prisma,
  PrismaClient,
  ProductManufacturer,
} from "@/generated/prisma/client.js";

export class ManufacturerRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    data: Prisma.ManufacturerCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Manufacturer> {
    const client = tx ?? this.prisma;
    const manufacturer = await client.manufacturer.create({ data });
    return manufacturer;
  }

  async attachToProduct(
    productId: string,
    manufacturerId: string,
    tx?: Prisma.TransactionClient,
  ): Promise<ProductManufacturer> {
    const client = tx ?? this.prisma;
    const prodManufacturer = await client.productManufacturer.create({
      data: {
        productId,
        manufacturerId,
      },
    });
    return prodManufacturer;
  }
}
