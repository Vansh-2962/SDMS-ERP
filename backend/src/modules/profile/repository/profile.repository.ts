import type { PrismaClient, Profile } from "@/generated/prisma/client.js";
import type { CreateProfileInput } from "../validators/profile.validator.js";

export class ProfileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOrUpdate(
    data: CreateProfileInput["body"],
    id?: string,
  ): Promise<Profile> {
    return await this.prisma.profile.upsert({
      where: {
        id: id ?? "",
      },
      create: {
        companyName: data.companyName,
        GSTIN: data.GSTIN,
        address: data.address ?? "",
        email: data.email ?? "",
        fssai: data.fssai ?? "",
        mobile: data.mobile ?? "",
        website: data.website ?? "",
        pan: data.pan ?? "",
      },
      update: {
        companyName: data.companyName,
        GSTIN: data.GSTIN,
        address: data.address ?? "",
        email: data.email ?? "",
        fssai: data.fssai ?? "",
        mobile: data.mobile ?? "",
        website: data.website ?? "",
        pan: data.pan ?? "",
        updatedAt: new Date(),
      },
    });
  }

  async getDetails(): Promise<Profile | null> {
    return await this.prisma.profile.findFirst();
  }
}
