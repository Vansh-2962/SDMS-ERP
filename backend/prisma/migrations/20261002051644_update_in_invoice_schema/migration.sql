-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "billingAddress" DROP NOT NULL,
ALTER COLUMN "shippingAddress" DROP NOT NULL;
