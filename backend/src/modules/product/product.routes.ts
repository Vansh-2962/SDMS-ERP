import { authenticate } from "@/middlewares/authenticate.middleware.js";
import { validate } from "@/middlewares/validate.middleware.js";
import { Router } from "express";
import { createProductSchema } from "./validators/product.schema.js";
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js";
import { ProductController } from "./product.controller.js";
import { ProductRepository } from "./product.repository.js";
import { prisma } from "@/config/database/prisma.js";
import { ProductService } from "./product.service.js";
import { BatchRepository } from "./batch/batch.repository.js";
import { InventoryRepository } from "./inventory/inventory.repository.js";
import { PriceRepository } from "./price/price.repository.js";
import { ManufacturerRepository } from "./manufacturer/manufacturer.repository.js";
import { CertificationRepository } from "./certifications/certifications.repository.js";

const productRouter: Router = Router();

const productRepository = new ProductRepository(prisma);
const batchRepository = new BatchRepository(prisma);
const inventoryRepository = new InventoryRepository(prisma);
const priceRepository = new PriceRepository(prisma);
const manufacturerRepository = new ManufacturerRepository(prisma);
const certificationRepository = new CertificationRepository(prisma);
const productService = new ProductService(
  productRepository,
  prisma,
  batchRepository,
  priceRepository,
  inventoryRepository,
  certificationRepository,
  manufacturerRepository,
);
const productController = new ProductController(productService);

productRouter.post(
  "/",
  authenticate,
  validate(createProductSchema),
  asyncHandler(productController.create),
);

productRouter.get("/", authenticate, asyncHandler(productController.getAll));

export { productRouter };
