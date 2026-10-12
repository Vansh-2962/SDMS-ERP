import type { BankDetails, PrismaClient } from "@/generated/prisma/client.js";
import type { CreateBankInput } from "../validators/bank.validator.js";
export declare class BankRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: CreateBankInput["body"]): Promise<BankDetails>;
    update(data: CreateBankInput["body"], id: string): Promise<BankDetails>;
    getDetails(): Promise<BankDetails | null>;
}
//# sourceMappingURL=bank.repository.d.ts.map