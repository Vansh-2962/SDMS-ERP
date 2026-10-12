import { ProfileMapper } from "../mappers/Profile.mapper.js";
export class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    createOrUpdate = async (req, res) => {
        const { body } = req.validated;
        const result = await this.profileService.createOrUpdate(body);
        return res.status(201).json({
            success: true,
            message: "Profile updated successfully",
            data: ProfileMapper.toResponse(result),
        });
    };
    getProfileDetails = async (_req, res) => {
        const result = await this.profileService.getProfileDetails();
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            data: result,
        });
    };
}
//# sourceMappingURL=profile.controller.js.map