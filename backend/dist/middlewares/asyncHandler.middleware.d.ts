import type { NextFunction, Request, RequestHandler, Response } from "express";
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;
export declare function asyncHandler(handler: AsyncHandler): RequestHandler;
export {};
//# sourceMappingURL=asyncHandler.middleware.d.ts.map