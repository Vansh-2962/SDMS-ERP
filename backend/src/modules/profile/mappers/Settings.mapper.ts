import type { BillingSettings } from "@/generated/prisma/client.js";

export class SettingsMapper {
  static toResponse(data: BillingSettings) {
    return {
      id: data.id,
    };
  }
}
