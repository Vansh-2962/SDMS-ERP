import type { Request, Response } from "express";
import type { ProfileService } from "../services/profile.service.js";
import type { CreateProfileInput } from "../validators/profile.validator.js";
import { ProfileMapper } from "../mappers/Profile.mapper.js";

export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  createOrUpdate = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateProfileInput;
    const result = await this.profileService.createOrUpdate(body);
    return res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: ProfileMapper.toResponse(result),
    });
  };

  getProfileDetails = async (_req: Request, res: Response) => {
    const result = await this.profileService.getProfileDetails();
    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: result,
    });
  };
}
