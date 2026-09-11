import type { Request, Response } from "express";
import type { SettingsService } from "@/modules/profile/services/settings.service.js";
import type { CreateSettingInput } from "@/modules/profile/validators/settings.validator.js";
import { SettingsMapper } from "@/modules/profile/mappers/Settings.mapper.js";

export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  createOrUpdate = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateSettingInput;
    const result = await this.settingsService.createOrUpdate(body);
    return res.status(201).json({
      success: true,
      message: "Settings updated successfully",
      data: SettingsMapper.toResponse(result),
    });
  };

  getSettingsDetails = async (_req: Request, res: Response) => {
    const result = await this.settingsService.getSettingsDetails();
    return res.status(200).json({
      success: true,
      message: "Settings fetched successfully",
      data: result,
    });
  };
}
