import type { Request, Response } from "express";
import type { SettingsService } from "@/modules/profile/services/settings.service.js";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    createOrUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getSettingsDetails: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=settings.controller.d.ts.map