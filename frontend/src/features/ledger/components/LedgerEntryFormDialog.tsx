import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateLedgerEntry,
  useUpdateLedgerEntry,
} from "../hooks/useLedgerEntries";
import type {
  LedgerEntry,
  LedgerEntryInput,
  LedgerEntryType,
} from "../types/ledger.types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  entry?: LedgerEntry | null;
}

const newEntry = (customerId: string): LedgerEntryInput => ({
  customerId,
  date: new Date().toISOString().slice(0, 10),
  particulars: "",
  type: "DEBIT",
  amount: 0,
});

export default function LedgerEntryFormDialog({
  open,
  onOpenChange,
  customerId,
  entry,
}: Props) {
  const [form, setForm] = useState<LedgerEntryInput>(() => newEntry(customerId));
  const createMutation = useCreateLedgerEntry();
  const updateMutation = useUpdateLedgerEntry(customerId);
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!open) return;
    setForm(
      entry
        ? {
            customerId,
            date: entry.date.slice(0, 10),
            particulars: entry.particulars,
            type: entry.type,
            amount: entry.amount,
          }
        : newEntry(customerId),
    );
  }, [customerId, entry, open]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (entry) {
      updateMutation.mutate(
        {
          id: entry.id,
          date: form.date,
          particulars: form.particulars,
          type: form.type,
          amount: form.amount,
        },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createMutation.mutate(form, {
        onSuccess: () => onOpenChange(false),
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) onOpenChange(nextOpen);
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {entry ? "Edit ledger entry" : "Add ledger entry"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="ledger-particulars">Particulars</Label>
              <Input
                id="ledger-particulars"
                required
                maxLength={500}
                value={form.particulars}
                onChange={(event) =>
                  setForm({ ...form, particulars: event.target.value })
                }
                placeholder="Invoice, receipt, adjustment..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ledger-type">Entry type</Label>
                <Select
                  value={form.type}
                  onValueChange={(type: LedgerEntryType) =>
                    setForm({ ...form, type })
                  }
                >
                  <SelectTrigger id="ledger-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DEBIT">Debit</SelectItem>
                    <SelectItem value="CREDIT">Credit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ledger-amount">Amount (₹)</Label>
                <Input
                  id="ledger-amount"
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  value={form.amount || ""}
                  onChange={(event) =>
                    setForm({ ...form, amount: Number(event.target.value) })
                  }
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ledger-date">Date</Label>
              <Input
                id="ledger-date"
                type="date"
                required
                value={form.date}
                onChange={(event) => setForm({ ...form, date: event.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : entry
                  ? "Save changes"
                  : "Add entry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
