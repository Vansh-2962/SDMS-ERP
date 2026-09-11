-- CreateEnum
CREATE TYPE "BankType" AS ENUM ('SAVINGS', 'CURRENT');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "GSTIN" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "fssai" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankDetails" (
    "id" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNUmber" BIGINT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "accountType" "BankType" NOT NULL DEFAULT 'CURRENT',
    "upiId" TEXT NOT NULL,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingSettings" (
    "id" TEXT NOT NULL,
    "invPrefix" TEXT NOT NULL DEFAULT 'INV',
    "finYearStart" TIMESTAMP(3) NOT NULL,
    "paymentTerms" INTEGER NOT NULL DEFAULT 30,

    CONSTRAINT "BillingSettings_pkey" PRIMARY KEY ("id")
);
