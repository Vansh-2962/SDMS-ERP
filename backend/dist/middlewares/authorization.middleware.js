import { auth } from "@/lib/auth/auth.js";
import { AuthorizationError } from "@/shared/errors/authorization.error.js";
export function requirePermission(resource, action) {
    return async (req, _res, next) => {
        try {
            if (!req.auth) {
                throw new AuthorizationError("Authentication required");
            }
            const result = await auth.api.userHasPermission({
                body: {
                    userId: req.auth.user.id,
                    permissions: {
                        [resource]: [action],
                    },
                },
            });
            if (!result.success) {
                throw new AuthorizationError("You do not have permission to perform this action");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=authorization.middleware.js.map