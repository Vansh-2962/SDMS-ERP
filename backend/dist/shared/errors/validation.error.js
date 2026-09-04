import { AppError } from "./app.error.js";
export class ValidationError extends AppError {
    constructor(message = "Validation failed", code = "VALIDATION_FAILED", details) {
        super({
            message,
            statusCode: 400,
            code,
            details,
            isOperational: true,
        });
    }
}
//# sourceMappingURL=validation.error.js.map