import { AppError } from "./app.error.js";
export class InternalServerError extends AppError {
    constructor(message = "Internal server error", code = "INTERNAL_SERVER_ERROR") {
        super({
            message,
            statusCode: 500,
            code,
            isOperational: false,
        });
    }
}
//# sourceMappingURL=internal-server-error.js.map