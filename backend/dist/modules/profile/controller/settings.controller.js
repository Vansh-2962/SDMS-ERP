import { SettingsMapper } from "@/modules/profile/mappers/Settings.mapper.js";
export class SettingsController {
    settingsService;
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    createOrUpdate = async (req, res) => {
        const { body } = req.validated;
        const result = await this.settingsService.createOrUpdate(body);
        return res.status(201).json({
            success: true,
            message: "Settings updated successfully",
            data: SettingsMapper.toResponse(result),
        });
    };
    getSettingsDetails = async (_req, res) => {
        const result = await this.settingsService.getSettingsDetails();
        return res.status(200).json({
            success: true,
            message: "Settings fetched successfully",
            data: result,
        });
    };
}
//# sourceMappingURL=settings.controller.js.map