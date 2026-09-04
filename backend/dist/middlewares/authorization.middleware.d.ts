import type { NextFunction, Request, Response } from "express";
export declare function requirePermission(resource: string, action: string): (req: Request, _res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=authorization.middleware.d.ts.map