import { AppError } from "./app.error.js";
export class AuthorizationError extends AppError {
    constructor(message = "Authorization failed", code = "AUTHORIZATION_FAILED") {
        super({
            message,
            code,
            statusCode: 403,
        });
    }
}
//# sourceMappingURL=authorization.error.js.map