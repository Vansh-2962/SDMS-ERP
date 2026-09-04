import { AsyncLocalStorage } from "node:async_hooks";
export const requestContext = new AsyncLocalStorage();
export function getRequestContext() {
    const store = requestContext.getStore();
    if (!store) {
        throw new Error("RequestContext is unavailable. Are you using the middleware?");
    }
    return store;
}
export function getLogger() {
    return getRequestContext().logger;
}
//# sourceMappingURL=request-context.js.map