import type {
  Prisma,
  PrismaClient,
  ProductCertification,
} from "@/generated/prisma/client.js";

export class CertificationRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    data: Prisma.ProductCertificationCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<ProductCertification> {
    const client = tx ?? this.prisma;
    const certification = await client.productCertification.create({ data });
    return certification;
  }
}
