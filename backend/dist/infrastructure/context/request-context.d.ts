import { AsyncLocalStorage } from "node:async_hooks";
import type { Logger } from "pino";
export interface RequestContext {
    requestId: string;
    logger: Logger;
}
export declare const requestContext: AsyncLocalStorage<RequestContext>;
export declare function getRequestContext(): RequestContext;
export declare function getLogger(): Logger;
//# sourceMappingURL=request-context.d.ts.map