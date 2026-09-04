import { logger } from "../../config/logger/index.js";
import { requestContext } from "./request-context.js";
import { generateRequestId } from "./request-id.js";
export function requestContextMiddleware(req, res, next) {
    const requestId = generateRequestId();
    const childLogger = logger.child({
        requestId,
    });
    res.setHeader("X-Request-Id", requestId);
    requestContext.run({
        requestId,
        logger: childLogger,
    }, () => {
        next();
    });
}
//# sourceMappingURL=request-context.middleware.js.map