import { AppError } from "./app.error.js";

export class ConflictError extends AppError {
  constructor(message = "Conflict Occurred", code = "RESOURCE_CONFLICT") {
    super({
      message,
      statusCode: 409,
      code,
    });
  }
}
