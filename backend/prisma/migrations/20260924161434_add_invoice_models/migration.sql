-- CreateEnum
CREATE TYPE "InvoiceLabel" AS ENUM ('TAX_INVOICE', 'DELIVERY_CHALLAN', 'PROFORMA_INVOICE', 'CREDIT_NOTE', 'DEBIT_NOTE');

-- CreateEnum
CREATE TYPE "SupplyType" AS ENUM ('TAXABLE', 'EXEMPT', 'EXPORT', 'SEZ', 'NON_GST');

-- CreateEnum
CREATE TYPE "TransportMode" AS ENUM ('ROAD', 'RAIL', 'AIR', 'SHIP', 'COURIER');

-- CreateTable
CREATE TABLE "NumberSequence" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NumberSequence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceItems" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "hsn" TEXT NOT NULL,
    "qty" DECIMAL(65,30) NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "discPer" DECIMAL(65,30) NOT NULL,
    "gstPer" DECIMAL(65,30) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoiceItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "label" "InvoiceLabel" NOT NULL,
    "sequenceId" TEXT NOT NULL,
    "docNo" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "docDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paymentTerms" TEXT,
    "supplyType" "SupplyType" NOT NULL,
    "placeOfSupply" TEXT,
    "reverseCharge" BOOLEAN,
    "transportMode" "TransportMode",
    "vehicleNo" TEXT,
    "ewayNo" TEXT,
    "deliveryDate" TIMESTAMP(3),
    "notes" TEXT,
    "terms" TEXT,
    "subTotal" DECIMAL(65,30) NOT NULL,
    "discount" DECIMAL(65,30),
    "roundOff" DECIMAL(65,30),
    "taxable" DECIMAL(65,30) NOT NULL,
    "igst" DECIMAL(65,30) NOT NULL,
    "sgst" DECIMAL(65,30) NOT NULL,
    "cgst" DECIMAL(65,30) NOT NULL,
    "grandTotal" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NumberSequence_key_key" ON "NumberSequence"("key");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceItems_productId_key" ON "InvoiceItems"("productId");

-- CreateIndex
CREATE INDEX "InvoiceItems_invoiceId_idx" ON "InvoiceItems"("invoiceId");

-- CreateIndex
CREATE INDEX "InvoiceItems_productId_idx" ON "InvoiceItems"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_docNo_key" ON "Invoice"("docNo");

-- CreateIndex
CREATE INDEX "Invoice_customerId_idx" ON "Invoice"("customerId");

-- CreateIndex
CREATE INDEX "Invoice_sequenceId_idx" ON "Invoice"("sequenceId");

-- CreateIndex
CREATE INDEX "Invoice_docDate_idx" ON "Invoice"("docDate");

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceItems" ADD CONSTRAINT "InvoiceItems_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "NumberSequence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
