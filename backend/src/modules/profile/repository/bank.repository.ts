import type { BankDetails, PrismaClient } from "@/generated/prisma/client.js";
import type { CreateBankInput } from "../validators/bank.validator.js";

export class BankRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOrUpdate(
    data: CreateBankInput["body"],
    id?: string,
  ): Promise<BankDetails> {
    return await this.prisma.bankDetails.upsert({
      where: {
        id: id ?? "",
      },
      create: {
        ...data,
        upiId: data.upiId ?? "",
      },
      update: {
        ...data,
        upiId: data.upiId ?? "",
        updatedAt: new Date(),
      },
    });
  }

  async getDetails(): Promise<BankDetails | null> {
    return await this.prisma.bankDetails.findFirst();
  }
}
