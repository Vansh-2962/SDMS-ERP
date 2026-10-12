import { validate } from "@/middlewares/validate.middleware.js";
import { Router } from "express";
import { createEmployeeSchema, employeeIdSchema, updateEmployeeSchema, } from "./validators/employee.validator.js";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { employeeController } from "./employee.module.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";
const employeeRouter = Router();
employeeRouter.post("/", authenticate, validate(createEmployeeSchema), asyncHandler(employeeController.create));
employeeRouter.get("/salesman", authenticate, asyncHandler(employeeController.fetchAllSalesman));
employeeRouter.get("/", authenticate, asyncHandler(employeeController.fetchAll));
employeeRouter.get("/:id", authenticate, validate(employeeIdSchema), asyncHandler(employeeController.getById));
employeeRouter.patch("/:id", authenticate, validate(updateEmployeeSchema), asyncHandler(employeeController.update));
employeeRouter.delete("/:id", authenticate, validate(employeeIdSchema), asyncHandler(employeeController.deactivate));
export { employeeRouter };
//# sourceMappingURL=employee.routes.js.map