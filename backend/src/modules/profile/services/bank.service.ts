import type { BankDetails } from "@/generated/prisma/client.js";
import type { BankRepository } from "../repository/bank.repository.js";
import type { CreateBankInput } from "../validators/bank.validator.js";

export class BankService {
  constructor(private readonly bankRepository: BankRepository) {}

  async createOrUpdate(data: CreateBankInput["body"]): Promise<BankDetails> {
    const existingData = await this.bankRepository.getDetails();
    let response;
    if (existingData) {
      response = await this.bankRepository.createOrUpdate(
        data,
        existingData.id,
      );
    }
    response = await this.bankRepository.createOrUpdate(data);
    return response;
  }

  async getBankDetails(): Promise<BankDetails | null> {
    return await this.bankRepository.getDetails();
  }
}
