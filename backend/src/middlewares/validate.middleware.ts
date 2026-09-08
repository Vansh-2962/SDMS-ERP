import { logger } from "@/config/logger/index.js";
import { ValidationError } from "@/shared/errors/validation.error.js";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

type ValidationSchema = z.ZodType;

export function validate(schema: ValidationSchema): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const fieldErrors = result.error.issues.reduce(
        (acc, issue) => {
          const path = issue.path.join(".");

          if (!acc[path]) {
            acc[path] = [];
          }

          acc[path].push(issue.message);

          return acc;
        },
        {} as Record<string, string[]>,
      );

      throw new ValidationError(
        "Request validation failed",
        "VALIDATION_ERROR",
        fieldErrors,
      );
    }

    req.validated = result.data;

    next();
  };
}
