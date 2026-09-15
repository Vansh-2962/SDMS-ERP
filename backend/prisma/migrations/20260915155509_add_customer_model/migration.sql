-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('DISTRIBUTOR', 'SUPER_STOCKIST', 'RETAILER', 'WHOLESALER', 'MODERN_TRADE');

-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "type" "CustomerType" NOT NULL,
    "gstNumber" TEXT,
    "pan" TEXT,
    "fssai" TEXT,
    "status" "CustomerStatus" NOT NULL DEFAULT 'ACTIVE',
    "mobile" TEXT NOT NULL,
    "whatsapp" TEXT,
    "email" TEXT,
    "street" TEXT,
    "state" TEXT,
    "stateCode" TEXT,
    "district" TEXT,
    "pincode" TEXT,
    "latitude" TEXT,
    "longitude" TEXT,
    "salesTerritory" TEXT,
    "assignedSalesmanId" TEXT,
    "creditLimit" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "paymentTerms" INTEGER NOT NULL DEFAULT 0,
    "openingBal" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_assignedSalesmanId_key" ON "Customer"("assignedSalesmanId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_assignedSalesmanId_fkey" FOREIGN KEY ("assignedSalesmanId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
