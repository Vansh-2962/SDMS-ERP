import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { requestContextMiddleware } from "@/infrastructure/context/request-context.middleware.js";
import { getLogger } from "@/infrastructure/context/request-context.js";
import { errorMiddleware } from "@/middlewares/error.middleware.js";
import { authRouter } from "@/modules/auth/auth.module.js";

const app: Application = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(requestContextMiddleware);

app.use(cookieParser());

app.use(express.json());

app.get("/health", (_, res) => {
  const logger = getLogger();
  logger.info("Testing request context");
  res.status(200).json({
    success: true,
    message: "SDMS Backend Running",
  });
});

app.use("/api/v1/auth", authRouter);

app.use(errorMiddleware);
export default app;
