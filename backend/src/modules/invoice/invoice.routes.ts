import { Router } from "express";
import { InvoiceRepository } from "./invoice.repository.js";
import { prisma } from "@/config/database/prisma.js";
import { InvoiceService } from "./invoice.service.js";
import { InventoryService } from "../product/inventory/inventory.service.js";
import { InventoryRepository } from "../product/inventory/inventory.repository.js";
import { customerService } from "../customer/customer.routes.js";
import { productService } from "../product/product.routes.js";
import { InvoiceController } from "./invoice.controller.js";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { createInvoiceSchema } from "./validators/invoice.validators.js";

const invoiceRouter: Router = Router();

const invoiceRepository = new InvoiceRepository(prisma);

const inventoryRepository = new InventoryRepository(prisma);
const inventoryService = new InventoryService(inventoryRepository);

const invoiceService = new InvoiceService(
  invoiceRepository,
  prisma,
  inventoryService,
  customerService,
  productService,
);

const invoiceController = new InvoiceController(invoiceService);

invoiceRouter.post(
  "/",
  authenticate,
  validate(createInvoiceSchema),
  asyncHandler(invoiceController.create),
);
invoiceRouter.get("/", authenticate, asyncHandler(invoiceController.getAll));

export { invoiceRouter };
