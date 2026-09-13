import type { BillingSettings } from "@/generated/prisma/client.js";
import type { SettingsRepository } from "../repository/settings.repository.js";
import type { CreateSettingInput } from "../validators/settings.validator.js";

export class SettingsService {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async createOrUpdate(
    data: CreateSettingInput["body"],
  ): Promise<BillingSettings> {
    const existingData = await this.settingsRepository.getDetails();
    let response;
    if (existingData) {
      response = await this.settingsRepository.update(data, existingData.id);
    } else {
      response = await this.settingsRepository.create(data);
    }
    return response;
  }

  async getSettingsDetails(): Promise<BillingSettings | null> {
    return await this.settingsRepository.getDetails();
  }
}
