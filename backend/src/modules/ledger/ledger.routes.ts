import { Router } from "express";
import { prisma } from "@/config/database/prisma.js";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { LedgerController } from "./ledger.controller.js";
import { LedgerRepository } from "./ledger.repository.js";
import { LedgerService } from "./ledger.service.js";
import {
  createLedgerEntrySchema,
  getLedgerEntriesSchema,
  ledgerEntryIdSchema,
  updateLedgerEntrySchema,
} from "./ledger.validators.js";

const ledgerRouter: Router = Router();
const repository = new LedgerRepository(prisma);
const service = new LedgerService(repository);
const controller = new LedgerController(service);

ledgerRouter.post(
  "/",
  authenticate,
  validate(createLedgerEntrySchema),
  asyncHandler(controller.create),
);
ledgerRouter.get(
  "/",
  authenticate,
  validate(getLedgerEntriesSchema),
  asyncHandler(controller.getAll),
);
ledgerRouter.get(
  "/:id",
  authenticate,
  validate(ledgerEntryIdSchema),
  asyncHandler(controller.getById),
);
ledgerRouter.patch(
  "/:id",
  authenticate,
  validate(updateLedgerEntrySchema),
  asyncHandler(controller.update),
);
ledgerRouter.delete(
  "/:id",
  authenticate,
  validate(ledgerEntryIdSchema),
  asyncHandler(controller.delete),
);

export { ledgerRouter };
