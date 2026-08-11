import type { ErrorRequestHandler } from "express";

import { mapToAppError } from "../shared/errors/index.js";
import {
  getLogger,
  getRequestContext,
} from "../infrastructure/context/index.js";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  const logger = getLogger();
  const { requestId } = getRequestContext();

  const appError = mapToAppError(error);

  if (appError.isOperational) {
    logger.warn(
      {
        err: appError,
      },
      appError.message,
    );
  } else {
    logger.error(
      {
        err: appError,
      },
      appError.message,
    );
  }

  return res.status(appError.statusCode).json({
    success: false,
    error: {
      code: appError.code,
      message: appError.message,
    },
    requestId,
  });
};
