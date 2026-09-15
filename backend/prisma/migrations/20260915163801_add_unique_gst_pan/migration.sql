/*
  Warnings:

  - A unique constraint covering the columns `[gstNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pan]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_gstNumber_key" ON "Customer"("gstNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_pan_key" ON "Customer"("pan");

-- CreateIndex
CREATE INDEX "Customer_gstNumber_idx" ON "Customer"("gstNumber");

-- CreateIndex
CREATE INDEX "Customer_pan_idx" ON "Customer"("pan");
