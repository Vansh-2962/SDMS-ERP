import type { Profile } from "@/generated/prisma/client.js";
import type { CreateProfileInput } from "../validators/profile.validator.js";
import type { ProfileRepository } from "../repository/profile.repository.js";

export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createOrUpdate(data: CreateProfileInput["body"]): Promise<Profile> {
    const existingData = await this.profileRepository.getDetails();
    let response;
    if (existingData) {
      response = await this.profileRepository.createOrUpdate(
        data,
        existingData.id,
      );
    }
    response = await this.profileRepository.createOrUpdate(data);
    return response;
  }

  async getProfileDetails(): Promise<Profile | null> {
    return await this.profileRepository.getDetails();
  }
}
