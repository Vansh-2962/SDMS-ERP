import type { Profile } from "@/generated/prisma/client.js";

export class ProfileMapper {
  static toResponse(data: Profile) {
    return {
      id: data.id,
    };
  }
}
