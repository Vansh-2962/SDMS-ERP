import { USER_ROLES, type UserRole } from "@/lib/auth/roles.js";
import { AuthenticationError } from "@/shared/errors/authentication.error.js";
import type { NextFunction, Request, Response } from "express";

export function loadAuthorizationContext(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    if (!req.auth) {
      throw new AuthenticationError("Authentication required");
    }

    const role = req.auth.user.role;

    if (!role) {
      throw new AuthenticationError("User role is not assigned");
    }

    if (!Object.values(USER_ROLES).includes(role as UserRole)) {
      throw new AuthenticationError("Invalid user role");
    }

    req.authorization = {
      userId: req.auth.user.id,
      role: role as UserRole,
    };

    next();
  } catch (error) {
    next(error);
  }
}
