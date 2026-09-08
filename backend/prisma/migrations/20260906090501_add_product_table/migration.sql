-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('FINISHED_GOOD', 'RAW_MATERIAL', 'PACKAGING_MATERIAL', 'SEMI_FURNISHED_GOOD');

-- CreateEnum
CREATE TYPE "ProductForm" AS ENUM ('POWDER', 'WHOLE', 'CRUSHED', 'GRANULES', 'PASTE', 'LIQUID', 'OTHER');

-- CreateEnum
CREATE TYPE "VegNonVeg" AS ENUM ('VEG', 'NON_VEG');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "barcode" TEXT,
    "name" TEXT NOT NULL,
    "commonName" TEXT,
    "botanicalName" TEXT,
    "brand" TEXT,
    "category" TEXT NOT NULL,
    "type" "ProductType" NOT NULL DEFAULT 'FINISHED_GOOD',
    "grade" TEXT,
    "form" "ProductForm",
    "hsn" TEXT,
    "unit" TEXT NOT NULL,
    "packagingType" TEXT,
    "packSize" DECIMAL(10,2),
    "netWeight" DECIMAL(10,2),
    "shelfLife" INTEGER,
    "processingMethod" TEXT,
    "rawMaterialSource" TEXT,
    "plantId" TEXT,
    "moistureContent" DECIMAL(5,2),
    "purityTest" TEXT,
    "adulterationTest" TEXT,
    "pesticideTestRef" TEXT,
    "ingredients" TEXT,
    "allergenInfo" TEXT,
    "storageInstructions" TEXT,
    "vegNonVeg" "VegNonVeg" NOT NULL DEFAULT 'VEG',
    "countryOfOrigin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_batches" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "batchNo" TEXT NOT NULL,
    "productionDate" TIMESTAMP(3),
    "mfgDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "bestBefore" TEXT,
    "plantId" TEXT,
    "processingMethod" TEXT,
    "moistureContent" DECIMAL(5,2),
    "purityTest" TEXT,
    "adulterationTest" TEXT,
    "pesticideTestRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_prices" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "mrp" DECIMAL(12,2),
    "distributorPrice" DECIMAL(12,2),
    "retailerPrice" DECIMAL(12,2),
    "dealerPrice" DECIMAL(12,2),
    "purchaseCost" DECIMAL(12,2),
    "manufacturingCost" DECIMAL(12,2),
    "gst" DECIMAL(5,2),
    "discountScheme" TEXT,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "batchId" TEXT,
    "warehouseLocation" TEXT NOT NULL,
    "currentStock" DECIMAL(14,3) NOT NULL DEFAULT 0,
    "reorderLevel" DECIMAL(14,3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fssaiLicense" TEXT,
    "address" TEXT,
    "countryOfOrigin" TEXT,
    "customerCarePhone" TEXT,
    "customerCareEmail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_manufacturers" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,

    CONSTRAINT "product_manufacturers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_certifications" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "certificateNumber" TEXT,
    "issuedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_code_key" ON "products"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_barcode_key" ON "products"("barcode");

-- CreateIndex
CREATE INDEX "products_name_idx" ON "products"("name");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "products_brand_idx" ON "products"("brand");

-- CreateIndex
CREATE INDEX "product_batches_batchNo_idx" ON "product_batches"("batchNo");

-- CreateIndex
CREATE INDEX "product_batches_expiryDate_idx" ON "product_batches"("expiryDate");

-- CreateIndex
CREATE UNIQUE INDEX "product_batches_productId_batchNo_key" ON "product_batches"("productId", "batchNo");

-- CreateIndex
CREATE INDEX "product_prices_productId_idx" ON "product_prices"("productId");

-- CreateIndex
CREATE INDEX "inventory_productId_idx" ON "inventory"("productId");

-- CreateIndex
CREATE INDEX "inventory_batchId_idx" ON "inventory"("batchId");

-- CreateIndex
CREATE INDEX "inventory_warehouseLocation_idx" ON "inventory"("warehouseLocation");

-- CreateIndex
CREATE UNIQUE INDEX "product_manufacturers_productId_manufacturerId_key" ON "product_manufacturers"("productId", "manufacturerId");

-- CreateIndex
CREATE INDEX "product_certifications_productId_idx" ON "product_certifications"("productId");

-- AddForeignKey
ALTER TABLE "product_batches" ADD CONSTRAINT "product_batches_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_prices" ADD CONSTRAINT "product_prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "product_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_manufacturers" ADD CONSTRAINT "product_manufacturers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_manufacturers" ADD CONSTRAINT "product_manufacturers_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_certifications" ADD CONSTRAINT "product_certifications_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
