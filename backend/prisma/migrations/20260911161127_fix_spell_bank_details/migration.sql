/*
  Warnings:

  - You are about to drop the column `accountNUmber` on the `BankDetails` table. All the data in the column will be lost.
  - Added the required column `accountNumber` to the `BankDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankDetails" DROP COLUMN "accountNUmber",
ADD COLUMN     "accountNumber" BIGINT NOT NULL;
