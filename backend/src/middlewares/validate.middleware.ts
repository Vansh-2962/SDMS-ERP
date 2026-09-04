import { ValidationError } from "@/shared/errors/validation.error.js";
import type { RequestHandler } from "express";
import type { ZodType } from "zod";

type ValidatedRequest = {
  body: unknown;
  params: unknown;
  query: unknown;
};

type ValidationSchema = ZodType<ValidatedRequest>;

export function validate(schema: ValidationSchema): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      throw new ValidationError(
        "Request validation failed",
        "VALIDATION_ERROR",
      );
    }

    req.validated = result.data;

    next();
  };
}
