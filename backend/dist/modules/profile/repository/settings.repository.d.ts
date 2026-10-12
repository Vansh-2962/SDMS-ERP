import type { BillingSettings, PrismaClient } from "@/generated/prisma/client.js";
import type { CreateSettingInput } from "../validators/settings.validator.js";
export declare class SettingsRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: CreateSettingInput["body"]): Promise<BillingSettings>;
    update(data: CreateSettingInput["body"], id: string): Promise<BillingSettings>;
    getDetails(): Promise<BillingSettings | null>;
}
//# sourceMappingURL=settings.repository.d.ts.map