import type { BankDetails } from "@/generated/prisma/client.js";
import type { BankRepository } from "../repository/bank.repository.js";
import type { CreateBankInput } from "../validators/bank.validator.js";
export declare class BankService {
    private readonly bankRepository;
    constructor(bankRepository: BankRepository);
    createOrUpdate(data: CreateBankInput["body"]): Promise<BankDetails>;
    getBankDetails(): Promise<BankDetails | null>;
}
//# sourceMappingURL=bank.service.d.ts.map