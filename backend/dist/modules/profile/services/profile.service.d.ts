import type { Profile } from "@/generated/prisma/client.js";
import type { CreateProfileInput } from "../validators/profile.validator.js";
import type { ProfileRepository } from "../repository/profile.repository.js";
export declare class ProfileService {
    private readonly profileRepository;
    constructor(profileRepository: ProfileRepository);
    createOrUpdate(data: CreateProfileInput["body"]): Promise<Profile>;
    getProfileDetails(): Promise<Profile | null>;
}
//# sourceMappingURL=profile.service.d.ts.map