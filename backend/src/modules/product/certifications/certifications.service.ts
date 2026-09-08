import type { Prisma } from "@/generated/prisma/client.js";
import type { CertificationRepository } from "./certifications.repository.js";

export class CertificationService {
  constructor(
    private readonly certificationRepository: CertificationRepository,
  ) {}

  async create(
    data: Prisma.ProductCertificationCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    const certification = await this.certificationRepository.create(data, tx);
    return certification;
  }
}
