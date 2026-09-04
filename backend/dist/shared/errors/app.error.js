export class AppError extends Error {
    statusCode;
    code;
    isOperational;
    constructor(options) {
        super(options.message);
        this.name = this.constructor.name;
        this.statusCode = options.statusCode;
        this.code = options.code;
        this.isOperational = options.isOperational ?? true;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=app.error.js.map