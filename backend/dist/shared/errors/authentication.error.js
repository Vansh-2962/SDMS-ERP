import { AppError } from "./app.error.js";
export class AuthenticationError extends AppError {
    constructor(message = "Authentication failed", code = "AUTHENTICATION_FAILED") {
        super({
            message,
            code,
            statusCode: 401,
        });
    }
}
//# sourceMappingURL=authentication.error.js.map