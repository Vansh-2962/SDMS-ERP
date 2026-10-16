import { axiosInstance } from "@/config/axios";
import type {
  LedgerEntry,
  LedgerEntryInput,
  UpdateLedgerEntryInput,
} from "../types/ledger.types";

interface LedgerListResponse {
  status: boolean;
  data: LedgerEntry[];
}

interface LedgerEntryResponse {
  status: boolean;
  data: LedgerEntry;
}

export async function getLedgerEntries(
  customerId: string,
): Promise<LedgerListResponse> {
  const response = await axiosInstance.get("/ledger", {
    params: { customerId },
  });
  return response.data;
}

export async function getLedgerEntry(
  id: string,
): Promise<LedgerEntryResponse> {
  const response = await axiosInstance.get(`/ledger/${id}`);
  return response.data;
}

export async function createLedgerEntry(
  data: LedgerEntryInput,
): Promise<LedgerEntryResponse> {
  const response = await axiosInstance.post("/ledger", data);
  return response.data;
}

export async function updateLedgerEntry(
  id: string,
  data: UpdateLedgerEntryInput,
): Promise<LedgerEntryResponse> {
  const response = await axiosInstance.patch(`/ledger/${id}`, data);
  return response.data;
}

export async function deleteLedgerEntry(id: string): Promise<void> {
  await axiosInstance.delete(`/ledger/${id}`);
}
