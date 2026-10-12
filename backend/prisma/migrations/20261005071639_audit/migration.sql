-- CreateEnum
CREATE TYPE "InventoryAdjustmentDirection" AS ENUM ('ADD', 'REMOVE');

-- CreateTable
CREATE TABLE "inventory_adjustments" (
    "id" TEXT NOT NULL,
    "stockroomItemId" TEXT,
    "inventoryId" TEXT,
    "quantity" DECIMAL(14,3) NOT NULL,
    "direction" "InventoryAdjustmentDirection" NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inventory_adjustments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "inventory_adjustments_stockroomItemId_idx" ON "inventory_adjustments"("stockroomItemId");

-- CreateIndex
CREATE INDEX "inventory_adjustments_inventoryId_idx" ON "inventory_adjustments"("inventoryId");

-- CreateIndex
CREATE INDEX "inventory_adjustments_createdAt_idx" ON "inventory_adjustments"("createdAt");

-- AddForeignKey
ALTER TABLE "inventory_adjustments" ADD CONSTRAINT "inventory_adjustments_stockroomItemId_fkey" FOREIGN KEY ("stockroomItemId") REFERENCES "stockroom_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventory_adjustments" ADD CONSTRAINT "inventory_adjustments_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
