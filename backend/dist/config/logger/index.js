import pino from "pino";
import env from "../env/index.js";
const options = {
    level: env.NODE_ENV === "production" ? "info" : "debug",
};
if (env.NODE_ENV !== "production") {
    options.transport = {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
        },
    };
}
export const logger = pino(options);
//# sourceMappingURL=index.js.map