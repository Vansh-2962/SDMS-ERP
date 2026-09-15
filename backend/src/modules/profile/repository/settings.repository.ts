import type {
  BillingSettings,
  PrismaClient,
} from "@/generated/prisma/client.js";
import type { CreateSettingInput } from "../validators/settings.validator.js";

export class SettingsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateSettingInput["body"]): Promise<BillingSettings> {
    return await this.prisma.billingSettings.create({
      data: {
        ...data,
        paymentTerms: data.paymentTerms ?? 0,
      },
    });
  }

  async update(
    data: CreateSettingInput["body"],
    id: string,
  ): Promise<BillingSettings> {
    return await this.prisma.billingSettings.update({
      where: {
        id,
      },
      data: {
        ...data,
        paymentTerms: data.paymentTerms ?? 0,
      },
    });
  }

  async getDetails(): Promise<BillingSettings | null> {
    return await this.prisma.billingSettings.findFirst();
  }
}
