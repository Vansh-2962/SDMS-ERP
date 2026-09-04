import { ValidationError } from "@/shared/errors/validation.error.js";
export function validate(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        if (!result.success) {
            throw new ValidationError("Request validation failed", "VALIDATION_ERROR");
        }
        req.validated = result.data;
        next();
    };
}
//# sourceMappingURL=validate.middleware.js.map