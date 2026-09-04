import { auth } from "@/lib/auth/auth.js";
import { AuthenticationError } from "@/shared/errors/authentication.error.js";
import { fromNodeHeaders } from "better-auth/node";
export async function authenticate(req, _res, next) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session) {
            throw new AuthenticationError("Authentication required");
        }
        req.auth = session;
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=authenticate.middleware.js.map