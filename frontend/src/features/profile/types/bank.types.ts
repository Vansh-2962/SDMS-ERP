export interface SaveBankData {
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountType: "SAVINGS" | "CURRENT";
  upiId: string;
}

export interface BankType {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  accountType: "SAVINGS" | "CURRENT";
  upiId: string;
}
