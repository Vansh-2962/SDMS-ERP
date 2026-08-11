import type { Request, Response } from "express";
import type { AuthService } from "@/modules/auth/services/auth.service.js";
import type { RegisterDto } from "@/modules/auth/dto/register.dto.js";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import type { LoginDto } from "../dto/login.dto.js";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = asyncHandler(async (req: Request, res: Response) => {
    const dto = req.body as RegisterDto;

    const user = await this.authService.register(dto);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const dto = req.body as LoginDto;

    const result = await this.authService.login(dto);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: result,
    });
  });

  refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const result = await this.authService.refresh(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: result,
    });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await this.authService.logout(refreshToken);
    return res.status(204).send();
  });
}
