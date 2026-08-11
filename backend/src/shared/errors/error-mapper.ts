import { ZodError } from "zod";
import { AppError } from "./app.error.js";
import { validationError } from "./validation.error.js";
import { InternalServerError } from "./internal-server-error.js";

export function mapToAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new validationError("Validation failed", "VALIDATION_FAILED");
  }

  return new InternalServerError();
}
