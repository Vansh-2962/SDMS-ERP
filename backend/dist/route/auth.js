import { auth } from "@/lib/auth/auth.js";
import { toNodeHandler } from "better-auth/node";
export const authRouter = toNodeHandler(auth);
//# sourceMappingURL=auth.js.map