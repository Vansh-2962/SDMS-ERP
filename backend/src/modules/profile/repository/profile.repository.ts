import type { PrismaClient, Profile } from "@/generated/prisma/client.js";
import type { CreateProfileInput } from "../validators/profile.validator.js";

export class ProfileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateProfileInput["body"]): Promise<Profile> {
    return await this.prisma.profile.create({
      data: {
        companyName: data.companyName,
        GSTIN: data.gstin,
        address: data.address ?? "",
        email: data.email ?? "",
        fssai: data.fssai ?? "",
        mobile: data.mobile ?? "",
        website: data.website ?? "",
        pan: data.pan ?? "",
      },
    });
  }

  async update(data: CreateProfileInput["body"], id: string): Promise<Profile> {
    return await this.prisma.profile.update({
      where: {
        id,
      },
      data: {
        companyName: data.companyName,
        GSTIN: data.gstin,
        address: data.address ?? "",
        email: data.email ?? "",
        fssai: data.fssai ?? "",
        mobile: data.mobile ?? "",
        website: data.website ?? "",
        pan: data.pan ?? "",
      },
    });
  }

  async getDetails(): Promise<Profile | null> {
    return await this.prisma.profile.findFirst();
  }
}
