export type LedgerEntryType = "DEBIT" | "CREDIT";

export interface LedgerEntry {
  id: string;
  customerId: string;
  date: string;
  particulars: string;
  type: LedgerEntryType;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface LedgerEntryInput {
  customerId: string;
  date: string;
  particulars: string;
  type: LedgerEntryType;
  amount: number;
}

export type UpdateLedgerEntryInput = Omit<LedgerEntryInput, "customerId">;
