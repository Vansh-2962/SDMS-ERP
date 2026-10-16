import type { LedgerEntry, Prisma } from "@/generated/prisma/client.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
import type { LedgerRepository } from "./ledger.repository.js";
import type {
  CreateLedgerEntryInput,
  UpdateLedgerEntryInput,
} from "./ledger.validators.js";

export class LedgerService {
  constructor(private readonly repository: LedgerRepository) {}

  async create(data: CreateLedgerEntryInput["body"]): Promise<LedgerEntry> {
    if (!(await this.repository.customerExists(data.customerId))) {
      throw new NotFoundError("Customer not found");
    }

    const { customerId, ...entry } = data;
    return this.repository.create({ ...entry, customerId });
  }

  async getAll(customerId: string): Promise<LedgerEntry[]> {
    if (!(await this.repository.customerExists(customerId))) {
      throw new NotFoundError("Customer not found");
    }
    return this.repository.getAll(customerId);
  }

  async getById(id: string): Promise<LedgerEntry> {
    const entry = await this.repository.getById(id);
    if (!entry) {
      throw new NotFoundError("Ledger entry not found");
    }
    return entry;
  }

  async update(
    id: string,
    data: UpdateLedgerEntryInput["body"],
  ): Promise<LedgerEntry> {
    await this.getById(id);
    const updateData: Prisma.LedgerEntryUpdateInput = {
      ...(data.date !== undefined && { date: data.date }),
      ...(data.particulars !== undefined && { particulars: data.particulars }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.amount !== undefined && { amount: data.amount }),
    };
    return this.repository.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.softDelete(id);
  }
}
