import { Router } from "express";
import { SaleOrderRepository } from "@/modules/saleOrder/repository/saleOrder.repository.js";
import { prisma } from "@/config/database/prisma.js";
import { SaleOrderService } from "@/modules/saleOrder/services/saleOrder.service.js";
import { SaleOrderController } from "@/modules/saleOrder/controllers/saleOrder.controller.js";
import { authenticate } from "@/middlewares/authenticate.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import {
  saleOrderSchema,
  saleOrderUpdateStatusSchema,
} from "@/modules/saleOrder/validators/saleOrder.validator.js";

const saleOrderRouter: Router = Router();

const saleOrderRepository = new SaleOrderRepository(prisma);
const saleOrderService = new SaleOrderService(saleOrderRepository);
const saleOrderController = new SaleOrderController(saleOrderService);

saleOrderRouter.post(
  "/",
  authenticate,
  validate(saleOrderSchema),
  saleOrderController.create,
);

saleOrderRouter.put(
  "/:id",
  authenticate,
  validate(saleOrderUpdateStatusSchema),
  saleOrderController.updateStatus,
);

saleOrderRouter.get("/", authenticate, saleOrderController.getAll);

export { saleOrderRouter };
