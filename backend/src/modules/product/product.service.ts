import {
  Prisma,
  PrismaClient,
  type Product,
} from "@/generated/prisma/client.js";
import type { ProductRepository } from "./product.repository.js";
import { ConflictError } from "@/shared/errors/conflict.error.js";
import type { CreateProductInput } from "./validators/product.schema.js";
import type { BatchRepository } from "./batch/batch.repository.js";
import type { PriceRepository } from "./price/price.repository.js";
import type { InventoryRepository } from "./inventory/inventory.repository.js";
import type { CertificationRepository } from "./certifications/certifications.repository.js";
import type { ManufacturerRepository } from "./manufacturer/manufacturer.repository.js";
import type { ProductWithRelations } from "./product.types.js";

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly prisma: PrismaClient,
    private readonly batchRepository: BatchRepository,
    private readonly priceRepository: PriceRepository,
    private readonly inventoryRepository: InventoryRepository,
    private readonly certificationRepository: CertificationRepository,
    private readonly manufacturerRepository: ManufacturerRepository,
  ) {}

  async create(
    data: CreateProductInput["body"],
    userId: string,
  ): Promise<Product> {
    try {
      const product = await this.prisma.$transaction(async (tx) => {
        const existingProduct = await this.productRepository.findByCode(
          data.code,
          tx,
        );

        if (existingProduct) {
          throw new ConflictError(
            "A product with this code already exists.",
            "PRODUCT_CODE_ALREADY_EXISTS",
          );
        }

        if (data.barcode) {
          const existingBarcode = await this.productRepository.findByBarcode(
            data.barcode,
            tx,
          );

          if (existingBarcode) {
            throw new ConflictError(
              "A product with this barcode already exists.",
              "PRODUCT_BARCODE_ALREADY_EXISTS",
            );
          }
        }

        // creating product
        const product = await this.productRepository.create(
          {
            code: data.code,
            name: data.name,
            category: data.category,
            unit: data.unit,

            ...(data.barcode !== undefined && {
              barcode: data.barcode,
            }),

            ...(data.commonName !== undefined && {
              commonName: data.commonName,
            }),

            ...(data.botanicalName !== undefined && {
              botanicalName: data.botanicalName,
            }),

            ...(data.brand !== undefined && {
              brand: data.brand,
            }),

            ...(data.type !== undefined && {
              type: data.type,
            }),

            ...(data.grade !== undefined && {
              grade: data.grade,
            }),

            ...(data.form !== undefined && {
              form: data.form,
            }),

            ...(data.hsn !== undefined && {
              hsn: data.hsn,
            }),

            ...(data.packagingType !== undefined && {
              packagingType: data.packagingType,
            }),

            ...(data.packSize !== undefined && {
              packSize: data.packSize,
            }),

            ...(data.netWeight !== undefined && {
              netWeight: data.netWeight,
            }),

            ...(data.shelfLife !== undefined && {
              shelfLife: data.shelfLife,
            }),

            ...(data.processingMethod !== undefined && {
              processingMethod: data.processingMethod,
            }),

            ...(data.rawMaterialSource !== undefined && {
              rawMaterialSource: data.rawMaterialSource,
            }),

            ...(data.plantId !== undefined && {
              plantId: data.plantId,
            }),

            ...(data.moistureContent !== undefined && {
              moistureContent: data.moistureContent,
            }),

            ...(data.purityTest !== undefined && {
              purityTest: data.purityTest,
            }),

            ...(data.adulterationTest !== undefined && {
              adulterationTest: data.adulterationTest,
            }),

            ...(data.pesticideTestRef !== undefined && {
              pesticideTestRef: data.pesticideTestRef,
            }),

            ...(data.ingredients !== undefined && {
              ingredients: data.ingredients,
            }),

            ...(data.allergenInfo !== undefined && {
              allergenInfo: data.allergenInfo,
            }),

            ...(data.storageInstructions !== undefined && {
              storageInstructions: data.storageInstructions,
            }),

            ...(data.vegNonVeg !== undefined && {
              vegNonVeg: data.vegNonVeg,
            }),

            ...(data.countryOfOrigin !== undefined && {
              countryOfOrigin: data.countryOfOrigin,
            }),

            createdBy: {
              connect: {
                id: userId,
              },
            },
          },
          tx,
        );

        // creating product manufacturer
        let manufacturerId: string | undefined;
        if (data.manufacturerName) {
          const manufacturer = await this.manufacturerRepository.create(
            {
              name: data.manufacturerName,

              ...(data.fssaiLicense !== undefined && {
                fssaiLicense: data.fssaiLicense,
              }),

              ...(data.manufacturerAddress !== undefined && {
                address: data.manufacturerAddress,
              }),

              ...(data.countryOfOrigin !== undefined && {
                countryOfOrigin: data.countryOfOrigin,
              }),

              ...(data.customerCarePhone !== undefined && {
                customerCarePhone: data.customerCarePhone,
              }),

              ...(data.customerCareEmail !== undefined && {
                customerCareEmail: data.customerCareEmail,
              }),
            },
            tx,
          );
          manufacturerId = manufacturer.id;

          await this.manufacturerRepository.attachToProduct(
            product.id,
            manufacturerId,
            tx,
          );
        }

        // creating product batch
        let batchId: string | undefined;
        if (data.batchNo) {
          const batch = await this.batchRepository.create(
            {
              product: {
                connect: {
                  id: product.id,
                },
              },
              batchNo: data.batchNo,

              ...(data.productionDate !== undefined && {
                productionDate: data.productionDate,
              }),

              ...(data.mfgDate !== undefined && {
                mfgDate: data.mfgDate,
              }),

              ...(data.expiryDate !== undefined && {
                expiryDate: data.expiryDate,
              }),

              ...(data.bestBefore !== undefined && {
                bestBefore: data.bestBefore,
              }),

              ...(data.plantId !== undefined && {
                plantId: data.plantId,
              }),

              ...(data.processingMethod !== undefined && {
                processingMethod: data.processingMethod,
              }),

              ...(data.moistureContent !== undefined && {
                moistureContent: data.moistureContent,
              }),

              ...(data.purityTest !== undefined && {
                purityTest: data.purityTest,
              }),

              ...(data.adulterationTest !== undefined && {
                adulterationTest: data.adulterationTest,
              }),

              ...(data.pesticideTestRef !== undefined && {
                pesticideTestRef: data.pesticideTestRef,
              }),
            },
            tx,
          );
          batchId = batch.id;
        }

        // creating inventory
        let inventoryId: string | undefined;
        if (
          data.warehouseLocation ||
          data.currentStock != undefined ||
          data.reorderLevel != undefined
        ) {
          const inventory = await this.inventoryRepository.create(
            {
              product: {
                connect: {
                  id: product.id,
                },
              },

              ...(batchId !== undefined && {
                batch: {
                  connect: {
                    id: batchId,
                  },
                },
              }),

              warehouseLocation: data.warehouseLocation ?? "DEFAULT",

              currentStock: data.currentStock ?? 0,

              ...(data.reorderLevel !== undefined && {
                reorderLevel: data.reorderLevel,
              }),
            },
            tx,
          );
          inventoryId = inventory.id;
        }

        // creating product pricing
        const hasPricingData =
          data.mrp !== undefined ||
          data.distributorPrice !== undefined ||
          data.retailerPrice !== undefined ||
          data.dealerPrice !== undefined ||
          data.purchaseCost !== undefined ||
          data.manufacturingCost !== undefined ||
          data.gst !== undefined ||
          data.discountScheme !== undefined;

        if (hasPricingData) {
          await this.priceRepository.create(
            {
              product: {
                connect: {
                  id: product.id,
                },
              },

              ...(data.mrp !== undefined && {
                mrp: data.mrp,
              }),

              ...(data.distributorPrice !== undefined && {
                distributorPrice: data.distributorPrice,
              }),

              ...(data.retailerPrice !== undefined && {
                retailerPrice: data.retailerPrice,
              }),

              ...(data.dealerPrice !== undefined && {
                dealerPrice: data.dealerPrice,
              }),

              ...(data.purchaseCost !== undefined && {
                purchaseCost: data.purchaseCost,
              }),

              ...(data.manufacturingCost !== undefined && {
                manufacturingCost: data.manufacturingCost,
              }),

              ...(data.gst !== undefined && {
                gst: data.gst,
              }),

              ...(data.discountScheme !== undefined && {
                discountScheme: data.discountScheme,
              }),
            },
            tx,
          );
        }

        // creating product certifications
        if (data.certifications) {
          await this.certificationRepository.create(
            {
              product: {
                connect: {
                  id: product.id,
                },
              },
              name: data.certifications,

              ...(data.exportCertNumber !== undefined && {
                certificateNumber: data.exportCertNumber,
              }),
            },
            tx,
          );
        }

        return product;
      });

      return product;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const target = error.meta?.target;

        if (Array.isArray(target) && target.includes("code")) {
          throw new ConflictError(
            "A product with this code already exists.",
            "PRODUCT_CODE_ALREADY_EXISTS",
          );
        }

        if (Array.isArray(target) && target.includes("barcode")) {
          throw new ConflictError(
            "A product with this barcode already exists.",
            "PRODUCT_BARCODE_ALREADY_EXISTS",
          );
        }

        throw new ConflictError(
          "A product with these details already exists.",
          "PRODUCT_ALREADY_EXISTS",
        );
      }

      throw error;
    }
  }

  async getAll(userId: string): Promise<ProductWithRelations[]> {
    return this.productRepository.findAll(userId);
  }
}
