import type { Request, Response } from "express";
import type { ProfileService } from "../services/profile.service.js";
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    createOrUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getProfileDetails: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=profile.controller.d.ts.map