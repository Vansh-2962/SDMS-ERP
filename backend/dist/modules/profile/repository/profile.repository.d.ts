import type { PrismaClient, Profile } from "@/generated/prisma/client.js";
import type { CreateProfileInput } from "../validators/profile.validator.js";
export declare class ProfileRepository {
    private readonly prisma;
    constructor(prisma: PrismaClient);
    create(data: CreateProfileInput["body"]): Promise<Profile>;
    update(data: CreateProfileInput["body"], id: string): Promise<Profile>;
    getDetails(): Promise<Profile | null>;
}
//# sourceMappingURL=profile.repository.d.ts.map