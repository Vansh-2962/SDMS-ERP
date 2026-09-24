-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'CANCELLED', 'VOID');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT';
