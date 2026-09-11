import type { BankDetails } from "@/generated/prisma/client.js";

export class BankMapper {
  static toResponse(data: BankDetails) {
    return {
      id: data.id,
    };
  }
}
