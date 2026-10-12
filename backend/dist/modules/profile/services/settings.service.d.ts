import type { BillingSettings } from "@/generated/prisma/client.js";
import type { SettingsRepository } from "../repository/settings.repository.js";
import type { CreateSettingInput } from "../validators/settings.validator.js";
export declare class SettingsService {
    private readonly settingsRepository;
    constructor(settingsRepository: SettingsRepository);
    createOrUpdate(data: CreateSettingInput["body"]): Promise<BillingSettings>;
    getSettingsDetails(): Promise<BillingSettings | null>;
}
//# sourceMappingURL=settings.service.d.ts.map