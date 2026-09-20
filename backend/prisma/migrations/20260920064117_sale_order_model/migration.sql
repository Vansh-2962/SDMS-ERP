-- CreateEnum
CREATE TYPE "SaleOrderStatus" AS ENUM ('PENDING', 'PACKED', 'DISPATCHED', 'DELIVERED');

-- CreateTable
CREATE TABLE "SaleOrderItems" (
    "id" TEXT NOT NULL,
    "gst" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "qty" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "saleOrderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleOrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleOrder" (
    "id" TEXT NOT NULL,
    "saleOrderCode" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "customerName" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subtotal" DECIMAL(65,30) NOT NULL,
    "gstAmount" DECIMAL(65,30) NOT NULL,
    "total" DECIMAL(65,30) NOT NULL,
    "status" "SaleOrderStatus" NOT NULL,
    "salesman" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaleOrder_saleOrderCode_key" ON "SaleOrder"("saleOrderCode");

-- CreateIndex
CREATE INDEX "SaleOrder_saleOrderCode_idx" ON "SaleOrder"("saleOrderCode");

-- CreateIndex
CREATE INDEX "SaleOrder_customerName_idx" ON "SaleOrder"("customerName");

-- AddForeignKey
ALTER TABLE "SaleOrderItems" ADD CONSTRAINT "SaleOrderItems_saleOrderId_fkey" FOREIGN KEY ("saleOrderId") REFERENCES "SaleOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleOrderItems" ADD CONSTRAINT "SaleOrderItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
