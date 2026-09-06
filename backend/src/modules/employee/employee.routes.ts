import { validate } from "@/middlewares/validate.middleware.js";
import { Router } from "express";
import { createEmployeeSchema } from "./validators/employee.validator.js";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { employeeController } from "./employee.module.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";

const employeeRouter: Router = Router();

employeeRouter.post(
  "/",
  authenticate,
  validate(createEmployeeSchema),
  asyncHandler(employeeController.create),
);

employeeRouter.get(
  "/salesman",
  authenticate,
  asyncHandler(employeeController.fetchAllSalesman),
);

export { employeeRouter };
