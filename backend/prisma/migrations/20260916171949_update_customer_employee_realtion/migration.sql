-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_assignedSalesmanId_fkey";

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_assignedSalesmanId_fkey" FOREIGN KEY ("assignedSalesmanId") REFERENCES "employees"("id") ON DELETE SET NULL ON UPDATE CASCADE;
