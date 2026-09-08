/*
  Warnings:

  - The values [SEMI_FURNISHED_GOOD] on the enum `ProductType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProductType_new" AS ENUM ('FINISHED_GOOD', 'RAW_MATERIAL', 'PACKAGING_MATERIAL', 'SEMI_FINISHED_GOOD');
ALTER TABLE "public"."products" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "products" ALTER COLUMN "type" TYPE "ProductType_new" USING ("type"::text::"ProductType_new");
ALTER TYPE "ProductType" RENAME TO "ProductType_old";
ALTER TYPE "ProductType_new" RENAME TO "ProductType";
DROP TYPE "public"."ProductType_old";
ALTER TABLE "products" ALTER COLUMN "type" SET DEFAULT 'FINISHED_GOOD';
COMMIT;
