import { AsyncLocalStorage } from "node:async_hooks";
import type { Logger } from "pino";

export interface RequestContext {
  requestId: string;
  logger: Logger;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export function getRequestContext(): RequestContext {
  const store = requestContext.getStore();

  if (!store) {
    throw new Error(
      "RequestContext is unavailable. Are you using the middleware?",
    );
  }

  return store;
}

export function getLogger(): Logger {
  return getRequestContext().logger;
}
