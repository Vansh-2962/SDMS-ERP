import { Prisma, PrismaClient, } from "@/generated/prisma/client.js";
import { ConflictError } from "@/shared/errors/conflict.error.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
export class ProductService {
    productRepository;
    prisma;
    batchRepository;
    priceRepository;
    inventoryRepository;
    certificationRepository;
    manufacturerRepository;
    constructor(productRepository, prisma, batchRepository, priceRepository, inventoryRepository, certificationRepository, manufacturerRepository) {
        this.productRepository = productRepository;
        this.prisma = prisma;
        this.batchRepository = batchRepository;
        this.priceRepository = priceRepository;
        this.inventoryRepository = inventoryRepository;
        this.certificationRepository = certificationRepository;
        this.manufacturerRepository = manufacturerRepository;
    }
    async create(data, userId) {
        try {
            const product = await this.prisma.$transaction(async (tx) => {
                const existingProduct = await this.productRepository.findByCode(data.code, tx);
                if (existingProduct) {
                    throw new ConflictError("A product with this code already exists.", "PRODUCT_CODE_ALREADY_EXISTS");
                }
                if (data.barcode) {
                    const existingBarcode = await this.productRepository.findByBarcode(data.barcode, tx);
                    if (existingBarcode) {
                        throw new ConflictError("A product with this barcode already exists.", "PRODUCT_BARCODE_ALREADY_EXISTS");
                    }
                }
                // creating product
                const product = await this.productRepository.create({
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
                        ...(data.moistureContent !== undefined && {
                            moistureContent: data.moistureContent,
                        }),
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
                }, tx);
                // creating product manufacturer
                let manufacturerId;
                if (data.manufacturerName) {
                    const manufacturer = await this.manufacturerRepository.create({
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
                    }, tx);
                    manufacturerId = manufacturer.id;
                    await this.manufacturerRepository.attachToProduct(product.id, manufacturerId, tx);
                }
                // creating product batch
                let batchId;
                if (data.batchNo) {
                    const batch = await this.batchRepository.create({
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
                    }, tx);
                    batchId = batch.id;
                }
                // creating inventory
                let inventoryId;
                if (data.warehouseLocation ||
                    data.currentStock != undefined ||
                    data.reorderLevel != undefined) {
                    const inventory = await this.inventoryRepository.create({
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
                    }, tx);
                    inventoryId = inventory.id;
                }
                // creating product pricing
                const hasPricingData = data.mrp !== undefined ||
                    data.distributorPrice !== undefined ||
                    data.retailerPrice !== undefined ||
                    data.dealerPrice !== undefined ||
                    data.purchaseCost !== undefined ||
                    data.manufacturingCost !== undefined ||
                    data.gst !== undefined ||
                    data.discountScheme !== undefined;
                if (hasPricingData) {
                    await this.priceRepository.create({
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
                    }, tx);
                }
                // creating product certifications
                if (data.certifications) {
                    await this.certificationRepository.create({
                        product: {
                            connect: {
                                id: product.id,
                            },
                        },
                        name: data.certifications,
                        ...(data.exportCertNumber !== undefined && {
                            certificateNumber: data.exportCertNumber,
                        }),
                    }, tx);
                }
                return product;
            }, {
                timeout: 10000,
            });
            return product;
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                const target = error.meta?.target;
                if (Array.isArray(target) && target.includes("code")) {
                    throw new ConflictError("A product with this code already exists.", "PRODUCT_CODE_ALREADY_EXISTS");
                }
                if (Array.isArray(target) && target.includes("barcode")) {
                    throw new ConflictError("A product with this barcode already exists.", "PRODUCT_BARCODE_ALREADY_EXISTS");
                }
                throw new ConflictError("A product with these details already exists.", "PRODUCT_ALREADY_EXISTS");
            }
            throw error;
        }
    }
    async getAll(userId) {
        return this.productRepository.findAll(userId);
    }
    async getById(id, userId) {
        const product = await this.productRepository.findForUser(id, userId);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return product;
    }
    async update(id, data, userId) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const existing = await this.productRepository.findForUser(id, userId, tx);
                if (!existing) {
                    throw new NotFoundError("Product not found");
                }
                if (data.code !== undefined && data.code !== existing.code) {
                    const duplicate = await this.productRepository.findByCode(data.code, tx);
                    if (duplicate) {
                        throw new ConflictError("A product with this code already exists.", "PRODUCT_CODE_ALREADY_EXISTS");
                    }
                }
                const barcode = data.barcode === "" ? null : data.barcode;
                if (barcode !== undefined &&
                    barcode !== null &&
                    barcode !== existing.barcode) {
                    const duplicate = await this.productRepository.findByBarcode(barcode, tx);
                    if (duplicate) {
                        throw new ConflictError("A product with this barcode already exists.", "PRODUCT_BARCODE_ALREADY_EXISTS");
                    }
                }
                const productData = {};
                if (data.code !== undefined)
                    productData.code = data.code;
                if (data.name !== undefined)
                    productData.name = data.name;
                if (data.category !== undefined)
                    productData.category = data.category;
                if (data.unit !== undefined)
                    productData.unit = data.unit;
                if (data.barcode !== undefined)
                    productData.barcode = data.barcode === "" ? null : data.barcode;
                if (data.commonName !== undefined)
                    productData.commonName = data.commonName || null;
                if (data.botanicalName !== undefined)
                    productData.botanicalName = data.botanicalName || null;
                if (data.brand !== undefined)
                    productData.brand = data.brand || null;
                if (data.type !== undefined)
                    productData.type = data.type;
                if (data.grade !== undefined)
                    productData.grade = data.grade || null;
                if (data.form !== undefined)
                    productData.form = data.form;
                if (data.hsn !== undefined)
                    productData.hsn = data.hsn || null;
                if (data.packagingType !== undefined)
                    productData.packagingType = data.packagingType || null;
                if (data.packSize !== undefined)
                    productData.packSize = data.packSize || null;
                if (data.netWeight !== undefined)
                    productData.netWeight = data.netWeight || null;
                if (data.shelfLife !== undefined)
                    productData.shelfLife = data.shelfLife;
                if (data.processingMethod !== undefined)
                    productData.processingMethod = data.processingMethod || null;
                if (data.rawMaterialSource !== undefined)
                    productData.rawMaterialSource = data.rawMaterialSource || null;
                if (data.plantId !== undefined)
                    productData.plantId = data.plantId || null;
                if (data.moistureContent !== undefined)
                    productData.moistureContent = data.moistureContent;
                if (data.purityTest !== undefined)
                    productData.purityTest = data.purityTest || null;
                if (data.adulterationTest !== undefined)
                    productData.adulterationTest = data.adulterationTest || null;
                if (data.pesticideTestRef !== undefined)
                    productData.pesticideTestRef = data.pesticideTestRef || null;
                if (data.ingredients !== undefined)
                    productData.ingredients = data.ingredients || null;
                if (data.allergenInfo !== undefined)
                    productData.allergenInfo = data.allergenInfo || null;
                if (data.storageInstructions !== undefined)
                    productData.storageInstructions = data.storageInstructions || null;
                if (data.vegNonVeg !== undefined)
                    productData.vegNonVeg = data.vegNonVeg;
                if (data.countryOfOrigin !== undefined)
                    productData.countryOfOrigin = data.countryOfOrigin || null;
                await tx.product.update({
                    where: { id },
                    data: productData,
                });
                const batch = existing.batches[0];
                if (batch && data.batchNo === "") {
                    throw new ConflictError("A batch number is required for an existing product batch.", "PRODUCT_BATCH_NUMBER_REQUIRED");
                }
                const hasBatchChanges = data.batchNo !== undefined ||
                    data.productionDate !== undefined ||
                    data.mfgDate !== undefined ||
                    data.expiryDate !== undefined ||
                    data.bestBefore !== undefined ||
                    data.plantId !== undefined ||
                    data.processingMethod !== undefined ||
                    data.moistureContent !== undefined ||
                    data.purityTest !== undefined ||
                    data.adulterationTest !== undefined ||
                    data.pesticideTestRef !== undefined;
                if (hasBatchChanges && (batch || data.batchNo)) {
                    const batchData = {};
                    if (data.batchNo !== undefined)
                        batchData.batchNo = data.batchNo;
                    if (data.productionDate !== undefined)
                        batchData.productionDate = data.productionDate;
                    if (data.mfgDate !== undefined)
                        batchData.mfgDate = data.mfgDate;
                    if (data.expiryDate !== undefined)
                        batchData.expiryDate = data.expiryDate;
                    if (data.bestBefore !== undefined)
                        batchData.bestBefore = data.bestBefore || null;
                    if (data.plantId !== undefined)
                        batchData.plantId = data.plantId || null;
                    if (data.processingMethod !== undefined)
                        batchData.processingMethod = data.processingMethod || null;
                    if (data.moistureContent !== undefined)
                        batchData.moistureContent = data.moistureContent;
                    if (data.purityTest !== undefined)
                        batchData.purityTest = data.purityTest || null;
                    if (data.adulterationTest !== undefined)
                        batchData.adulterationTest = data.adulterationTest || null;
                    if (data.pesticideTestRef !== undefined)
                        batchData.pesticideTestRef = data.pesticideTestRef || null;
                    if (batch) {
                        await tx.productBatch.update({
                            where: { id: batch.id },
                            data: batchData,
                        });
                    }
                    else if (data.batchNo) {
                        await tx.productBatch.create({
                            data: {
                                productId: id,
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
                                bestBefore: data.bestBefore || null,
                                plantId: data.plantId || null,
                                processingMethod: data.processingMethod || null,
                                ...(data.moistureContent !== undefined && {
                                    moistureContent: data.moistureContent,
                                }),
                                purityTest: data.purityTest || null,
                                adulterationTest: data.adulterationTest || null,
                                pesticideTestRef: data.pesticideTestRef || null,
                            },
                        });
                    }
                }
                const priceValues = {
                    mrp: data.mrp,
                    distributorPrice: data.distributorPrice,
                    retailerPrice: data.retailerPrice,
                    dealerPrice: data.dealerPrice,
                    purchaseCost: data.purchaseCost,
                    manufacturingCost: data.manufacturingCost,
                    gst: data.gst,
                    discountScheme: data.discountScheme,
                };
                const hasPriceChanges = Object.values(priceValues).some((value) => value !== undefined);
                if (hasPriceChanges) {
                    const currentPrice = existing.prices[0];
                    const priceData = {};
                    if (data.mrp !== undefined)
                        priceData.mrp = data.mrp;
                    if (data.distributorPrice !== undefined)
                        priceData.distributorPrice = data.distributorPrice;
                    if (data.retailerPrice !== undefined)
                        priceData.retailerPrice = data.retailerPrice;
                    if (data.dealerPrice !== undefined)
                        priceData.dealerPrice = data.dealerPrice;
                    if (data.purchaseCost !== undefined)
                        priceData.purchaseCost = data.purchaseCost;
                    if (data.manufacturingCost !== undefined)
                        priceData.manufacturingCost = data.manufacturingCost;
                    if (data.gst !== undefined)
                        priceData.gst = data.gst;
                    if (data.discountScheme !== undefined)
                        priceData.discountScheme = data.discountScheme || null;
                    if (currentPrice) {
                        await tx.productPrice.update({
                            where: { id: currentPrice.id },
                            data: priceData,
                        });
                    }
                    else {
                        await tx.productPrice.create({
                            data: {
                                productId: id,
                                ...(data.mrp !== undefined && { mrp: data.mrp }),
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
                                ...(data.gst !== undefined && { gst: data.gst }),
                                ...(data.discountScheme !== undefined && {
                                    discountScheme: data.discountScheme || null,
                                }),
                            },
                        });
                    }
                }
                const inventory = existing.inventories[0];
                const hasInventoryChanges = data.warehouseLocation !== undefined ||
                    data.currentStock !== undefined ||
                    data.reorderLevel !== undefined;
                if (hasInventoryChanges) {
                    if (inventory) {
                        await tx.inventory.update({
                            where: { id: inventory.id },
                            data: {
                                ...(data.warehouseLocation && {
                                    warehouseLocation: data.warehouseLocation,
                                }),
                                ...(data.currentStock !== undefined && {
                                    currentStock: data.currentStock,
                                }),
                                ...(data.reorderLevel !== undefined && {
                                    reorderLevel: data.reorderLevel,
                                }),
                            },
                        });
                    }
                    else if (data.warehouseLocation || data.currentStock !== undefined) {
                        await tx.inventory.create({
                            data: {
                                productId: id,
                                warehouseLocation: data.warehouseLocation || "DEFAULT",
                                currentStock: data.currentStock ?? 0,
                                ...(data.reorderLevel !== undefined && {
                                    reorderLevel: data.reorderLevel,
                                }),
                            },
                        });
                    }
                }
                const productManufacturer = existing.productManufacturer[0];
                const manufacturer = productManufacturer?.manufacturer;
                if (manufacturer) {
                    const manufacturerData = {};
                    if (data.manufacturerName !== undefined && data.manufacturerName)
                        manufacturerData.name = data.manufacturerName;
                    if (data.fssaiLicense !== undefined)
                        manufacturerData.fssaiLicense = data.fssaiLicense || null;
                    if (data.manufacturerAddress !== undefined)
                        manufacturerData.address = data.manufacturerAddress || null;
                    if (data.countryOfOrigin !== undefined)
                        manufacturerData.countryOfOrigin = data.countryOfOrigin || null;
                    if (data.customerCarePhone !== undefined)
                        manufacturerData.customerCarePhone =
                            data.customerCarePhone || null;
                    if (data.customerCareEmail !== undefined)
                        manufacturerData.customerCareEmail =
                            data.customerCareEmail || null;
                    if (Object.keys(manufacturerData).length > 0) {
                        await tx.manufacturer.update({
                            where: { id: manufacturer.id },
                            data: manufacturerData,
                        });
                    }
                }
                else if (data.manufacturerName) {
                    await tx.productManufacturer.create({
                        data: {
                            productId: id,
                            manufacturerId: (await tx.manufacturer.create({
                                data: {
                                    name: data.manufacturerName,
                                    fssaiLicense: data.fssaiLicense || null,
                                    address: data.manufacturerAddress || null,
                                    countryOfOrigin: data.countryOfOrigin || null,
                                    customerCarePhone: data.customerCarePhone || null,
                                    customerCareEmail: data.customerCareEmail || null,
                                },
                            })).id,
                        },
                    });
                }
                const certification = existing.certifications[0];
                if (data.certifications !== undefined) {
                    if (!data.certifications) {
                        await tx.productCertification.deleteMany({
                            where: { productId: id },
                        });
                    }
                    else if (certification) {
                        await tx.productCertification.update({
                            where: { id: certification.id },
                            data: {
                                name: data.certifications,
                                certificateNumber: data.exportCertNumber || null,
                            },
                        });
                    }
                    else {
                        await tx.productCertification.create({
                            data: {
                                productId: id,
                                name: data.certifications,
                                certificateNumber: data.exportCertNumber || null,
                            },
                        });
                    }
                }
                else if (certification && data.exportCertNumber !== undefined) {
                    await tx.productCertification.update({
                        where: { id: certification.id },
                        data: {
                            certificateNumber: data.exportCertNumber || null,
                        },
                    });
                }
                const updated = await this.productRepository.findForUser(id, userId, tx);
                if (!updated) {
                    throw new NotFoundError("Product not found");
                }
                return updated;
            }, { timeout: 10000 });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002") {
                const target = error.meta?.target;
                if (Array.isArray(target) && target.includes("code")) {
                    throw new ConflictError("A product with this code already exists.", "PRODUCT_CODE_ALREADY_EXISTS");
                }
                if (Array.isArray(target) && target.includes("barcode")) {
                    throw new ConflictError("A product with this barcode already exists.", "PRODUCT_BARCODE_ALREADY_EXISTS");
                }
                throw new ConflictError("A product with these details already exists.", "PRODUCT_ALREADY_EXISTS");
            }
            throw error;
        }
    }
    async deleteProduct(id) {
        if (!id) {
            throw new Error("Please provide a valid product ID");
        }
        const response = await this.productRepository.deleteProduct(id);
        if (!response) {
            throw new NotFoundError("Product not found");
        }
        return response;
    }
    async getAllInInvoice(ids, tx) {
        return await this.productRepository.getAllInInvoice(ids, tx);
    }
}
//# sourceMappingURL=product.service.js.map