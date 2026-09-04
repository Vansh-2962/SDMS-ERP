import { auth } from "@/lib/auth/auth.js";
import { AuthenticationError } from "@/shared/errors/authentication.error.js";
import { fromNodeHeaders } from "better-auth/node";
import type { NextFunction, Request, Response } from "express";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new AuthenticationError("Authentication required");
    }

    req.auth = session;

    next();
  } catch (error) {
    next(error);
  }
}
