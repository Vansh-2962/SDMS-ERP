import type { TokenService } from "@/modules/auth/services/token.service.js";
import { AuthenticationError } from "@/shared/errors/authentication.error.js";
import type { NextFunction, Request, Response } from "express";

export function createAuthenticateMiddleware(tokenService: TokenService) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return next(
        new AuthenticationError(
          "Authenticaion required",
          "AUTHENTICATION_REQUIRED",
        ),
      );
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      return next(
        new AuthenticationError(
          "Invalid authorization header",
          "INVALID_AUTHORIZATION_HEADER",
        ),
      );
    }

    try {
      const payload = await tokenService.verifyAccessToken(token);
      req.user = {
        id: payload.sub,
      };
      next();
    } catch (error) {
      next(
        new AuthenticationError(
          "Invalid or expired access token",
          "INVALID_ACCESS_TOKEN",
        ),
      );
    }
  };
}
