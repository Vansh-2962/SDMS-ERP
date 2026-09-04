import { USER_ROLES } from "@/lib/auth/roles.js";
import { AuthenticationError } from "@/shared/errors/authentication.error.js";
export function loadAuthorizationContext(req, _res, next) {
    try {
        if (!req.auth) {
            throw new AuthenticationError("Authentication required");
        }
        const role = req.auth.user.role;
        if (!role) {
            throw new AuthenticationError("User role is not assigned");
        }
        if (!Object.values(USER_ROLES).includes(role)) {
            throw new AuthenticationError("Invalid user role");
        }
        req.authorization = {
            userId: req.auth.user.id,
            role: role,
        };
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=authorization-context.middleware.js.map