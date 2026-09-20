/*
  Warnings:

  - You are about to drop the column `salesman` on the `SaleOrder` table. All the data in the column will be lost.
  - Added the required column `salesmanId` to the `SaleOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleOrder" DROP COLUMN "salesman",
ADD COLUMN     "salesmanId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleOrder" ADD CONSTRAINT "SaleOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleOrder" ADD CONSTRAINT "SaleOrder_salesmanId_fkey" FOREIGN KEY ("salesmanId") REFERENCES "employees"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
