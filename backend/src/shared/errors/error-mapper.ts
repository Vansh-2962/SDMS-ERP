import { ZodError } from "zod";
import { AppError } from "./app.error.js";
import { ValidationError } from "./validation.error.js";
import { InternalServerError } from "./internal-server-error.js";
import { logger } from "@/config/logger/index.js";

export function mapToAppError(error: unknown): AppError {
  logger.debug(error);
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new ValidationError(
      "Validation failed",
      "VALIDATION_FAILED",
      error.flatten().fieldErrors,
    );
  }

  return new InternalServerError();
}
