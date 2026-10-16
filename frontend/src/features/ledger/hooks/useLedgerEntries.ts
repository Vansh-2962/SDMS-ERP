import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  createLedgerEntry,
  deleteLedgerEntry,
  getLedgerEntry,
  getLedgerEntries,
  updateLedgerEntry,
} from "../api/ledger.api";
import type {
  LedgerEntryInput,
  UpdateLedgerEntryInput,
} from "../types/ledger.types";

const ledgerQueryKey = (customerId: string) => ["ledger", customerId] as const;

function invalidateLedger(
  queryClient: ReturnType<typeof useQueryClient>,
  customerId: string,
) {
  void queryClient.invalidateQueries({ queryKey: ledgerQueryKey(customerId) });
}

function showMutationError(error: Error, action: string) {
  const responseMessage =
    error instanceof AxiosError
      ? error.response?.data?.error?.message ?? error.response?.data?.message
      : undefined;
  toast.error(responseMessage ?? `Failed to ${action} ledger entry`);
}

export function useLedgerEntries(customerId: string | null) {
  return useQuery({
    queryKey: ["ledger", customerId],
    queryFn: () => getLedgerEntries(customerId!),
    enabled: Boolean(customerId),
  });
}

export function useLedgerEntry(id: string | null) {
  return useQuery({
    queryKey: ["ledger-entry", id],
    queryFn: () => getLedgerEntry(id!),
    enabled: Boolean(id),
  });
}

export function useCreateLedgerEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LedgerEntryInput) => createLedgerEntry(data),
    onSuccess: (_result, data) => {
      toast.success("Ledger entry created successfully");
      invalidateLedger(queryClient, data.customerId);
    },
    onError: (error) => showMutationError(error, "create"),
  });
}

export function useUpdateLedgerEntry(customerId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...data
    }: UpdateLedgerEntryInput & { id: string }) => updateLedgerEntry(id, data),
    onSuccess: () => {
      toast.success("Ledger entry updated successfully");
      invalidateLedger(queryClient, customerId);
    },
    onError: (error) => showMutationError(error, "update"),
  });
}

export function useDeleteLedgerEntry(customerId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLedgerEntry(id),
    onSuccess: () => {
      toast.success("Ledger entry deleted successfully");
      invalidateLedger(queryClient, customerId);
    },
    onError: (error) => showMutationError(error, "delete"),
  });
}
