export interface AppErrorOptions {
    message: string;
    statusCode: number;
    code: string;
    details?: unknown;
    isOperational?: boolean;
}
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    readonly isOperational: boolean;
    constructor(options: AppErrorOptions);
}
//# sourceMappingURL=app.error.d.ts.map