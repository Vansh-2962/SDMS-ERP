import type {
  BillingSettings,
  PrismaClient,
} from "@/generated/prisma/client.js";
import type { CreateSettingInput } from "../validators/settings.validator.js";

export class SettingsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOrUpdate(
    data: CreateSettingInput["body"],
    id?: string,
  ): Promise<BillingSettings> {
    return await this.prisma.billingSettings.upsert({
      where: {
        id: id ?? "",
      },
      create: {
        ...data,
        paymentTerms: data.paymentTerms ?? 0,
      },
      update: {
        ...data,
        paymentTerms: data.paymentTerms ?? 0,
        updatedAt: new Date(),
      },
    });
  }

  async getDetails(): Promise<BillingSettings | null> {
    return await this.prisma.billingSettings.findFirst();
  }
}
