/*
  Warnings:

  - The `empCode` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "empCode",
ADD COLUMN     "empCode" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employees_empCode_key" ON "employees"("empCode");

-- CreateIndex
CREATE INDEX "employees_empCode_idx" ON "employees"("empCode");
