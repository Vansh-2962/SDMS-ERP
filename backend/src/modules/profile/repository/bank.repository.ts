import type { BankDetails, PrismaClient } from "@/generated/prisma/client.js";
import type { CreateBankInput } from "../validators/bank.validator.js";

export class BankRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateBankInput["body"]): Promise<BankDetails> {
    return await this.prisma.bankDetails.create({
      data: {
        ...data,
        upiId: data.upiId ?? "",
      },
    });
  }

  async update(
    data: CreateBankInput["body"],
    id: string,
  ): Promise<BankDetails> {
    return await this.prisma.bankDetails.update({
      where: {
        id,
      },
      data: {
        ...data,
        upiId: data.upiId ?? "",
      },
    });
  }

  async getDetails(): Promise<BankDetails | null> {
    return await this.prisma.bankDetails.findFirst();
  }
}
