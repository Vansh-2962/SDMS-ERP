import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import { requestContextMiddleware } from "@/infrastructure/context/request-context.middleware.js";
import { getLogger } from "@/infrastructure/context/request-context.js";
import { errorMiddleware } from "@/middlewares/error.middleware.js";
import { authRouter } from "@/route/auth.js";
import { employeeRouter } from "./modules/employee/employee.routes.js";

const app: Application = express();

app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://sdms-erp-front.onrender.com"],
    credentials: true,
  }),
);

app.use(compression());

app.use(requestContextMiddleware);

app.use(cookieParser());

app.use(express.json());

app.all("/api/auth/{*any}", authRouter);
app.use("/api/v1/employees", employeeRouter);

app.get("/health", (_, res) => {
  const logger = getLogger();
  logger.info("Testing request context");
  res.status(200).json({
    success: true,
    message: "SDMS Backend Running",
  });
});

app.use(errorMiddleware);
export default app;
