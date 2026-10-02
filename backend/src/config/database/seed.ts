import type { InvoiceLabel } from "@/generated/prisma/enums.js";
import { prisma } from "./prisma.js";

async function main() {
  const sequences = [
    "TAX_INVOICE",
    "PROFORMA_INVOICE",
    "DELIVERY_CHALLAN",
    "CREDIT_NOTE",
    "DEBIT_NOTE",
  ] as InvoiceLabel[];

  for (const key of sequences) {
    await prisma.numberSequence.upsert({
      where: { key },
      update: {},
      create: {
        key,
        current: 0,
      },
    });
  }

  console.log("✅ Invoice number sequences seeded successfully");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
