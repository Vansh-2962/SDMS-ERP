import type { RequestHandler } from "express";
import type { ZodType } from "zod";
type ValidatedRequest = {
    body: unknown;
    params: unknown;
    query: unknown;
};
type ValidationSchema = ZodType<ValidatedRequest>;
export declare function validate(schema: ValidationSchema): RequestHandler;
export {};
//# sourceMappingURL=validate.middleware.d.ts.map