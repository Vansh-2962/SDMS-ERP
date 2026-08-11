import { AppError } from "./app.error.js";

export class ValidationError extends AppError {
  constructor(
    message = "Validation failed",
    code = "VALIDATION_FAILED",
    details?: unknown,
  ) {
    super({
      message,
      statusCode: 400,
      code,
      details,
      isOperational: true,
    });
  }
}
