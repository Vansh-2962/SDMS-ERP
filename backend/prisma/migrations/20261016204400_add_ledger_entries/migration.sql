CREATE TYPE "LedgerEntryType" AS ENUM ('DEBIT', 'CREDIT');

CREATE TABLE "ledger_entries" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "particulars" TEXT NOT NULL,
    "type" "LedgerEntryType" NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ledger_entries_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ledger_entries_customerId_date_idx" ON "ledger_entries"("customerId", "date");
CREATE INDEX "ledger_entries_deletedAt_idx" ON "ledger_entries"("deletedAt");

ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_customerId_fkey"
FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
