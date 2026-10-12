import { Router } from "express";
import { prisma } from "@/config/database/prisma.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { ExpenseController } from "./expense.controller.js";
import { ExpenseRepository } from "./expense.repository.js";
import { ExpenseService } from "./expense.service.js";
import {
  createExpenseSchema,
  expenseIdSchema,
  updateExpenseSchema,
} from "./expense.validators.js";

const expenseRouter: Router = Router();
const expenseRepository = new ExpenseRepository(prisma);
const expenseService = new ExpenseService(expenseRepository);
const expenseController = new ExpenseController(expenseService);

expenseRouter.post(
  "/",
  authenticate,
  validate(createExpenseSchema),
  asyncHandler(expenseController.create),
);
expenseRouter.get("/", authenticate, asyncHandler(expenseController.getAll));
expenseRouter.get(
  "/:id",
  authenticate,
  validate(expenseIdSchema),
  asyncHandler(expenseController.getById),
);
expenseRouter.patch(
  "/:id",
  authenticate,
  validate(updateExpenseSchema),
  asyncHandler(expenseController.update),
);
expenseRouter.delete(
  "/:id",
  authenticate,
  validate(expenseIdSchema),
  asyncHandler(expenseController.delete),
);

export { expenseRouter };
