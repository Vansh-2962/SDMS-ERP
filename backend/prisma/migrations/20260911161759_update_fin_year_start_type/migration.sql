/*
  Warnings:

  - Made the column `finYearStart` on table `BillingSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BillingSettings" ALTER COLUMN "finYearStart" SET NOT NULL;
