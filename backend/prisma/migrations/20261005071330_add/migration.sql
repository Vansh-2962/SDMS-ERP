-- CreateEnum
CREATE TYPE "StockroomItemType" AS ENUM ('RAW_MATERIAL', 'PACKAGING_MATERIAL', 'OTHER');

-- CreateTable
CREATE TABLE "stockroom_items" (
    "id" TEXT NOT NULL,
    "type" "StockroomItemType" NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "currentStock" DECIMAL(14,3) NOT NULL DEFAULT 0,
    "reorderLevel" DECIMAL(14,3) NOT NULL DEFAULT 0,
    "purchasePrice" DECIMAL(14,2) NOT NULL DEFAULT 0,
    "supplier" TEXT,
    "lastPurchaseDate" TIMESTAMP(3),
    "warehouseLocation" TEXT,
    "batchNo" TEXT,
    "notes" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stockroom_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "stockroom_items_type_idx" ON "stockroom_items"("type");

-- CreateIndex
CREATE INDEX "stockroom_items_deletedAt_idx" ON "stockroom_items"("deletedAt");
