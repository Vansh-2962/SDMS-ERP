import app from "./app.js";
import env from "./config/env/index.js";
import { logger } from "./config/logger/index.js";

const startServer = () => {
  app.listen(env.PORT, () => {
    logger.info(
      {
        port: env.PORT,
        environment: env.NODE_ENV,
      },
      "SDMS Backend Started",
    );
  });
};

startServer();
