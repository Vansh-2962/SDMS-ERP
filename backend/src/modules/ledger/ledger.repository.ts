import type {
  LedgerEntry,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";

export class LedgerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async customerExists(customerId: string): Promise<boolean> {
    return Boolean(
      await this.prisma.customer.findUnique({
        where: { id: customerId },
        select: { id: true },
      }),
    );
  }

  async create(data: Prisma.LedgerEntryUncheckedCreateInput): Promise<LedgerEntry> {
    return this.prisma.ledgerEntry.create({ data });
  }

  async getAll(customerId: string): Promise<LedgerEntry[]> {
    return this.prisma.ledgerEntry.findMany({
      where: { customerId, deletedAt: null },
      orderBy: [{ date: "asc" }, { createdAt: "asc" }],
    });
  }

  async getById(id: string): Promise<LedgerEntry | null> {
    return this.prisma.ledgerEntry.findFirst({
      where: { id, deletedAt: null },
    });
  }

  async update(
    id: string,
    data: Prisma.LedgerEntryUpdateInput,
  ): Promise<LedgerEntry> {
    return this.prisma.ledgerEntry.update({ where: { id }, data });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.ledgerEntry.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
