import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconBook,
  IconBuildingStore,
  IconDownload,
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconTruckDelivery,
} from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCustomers } from "@/features/customers/hooks/useGetCustomers";
import type { Customer } from "@/features/customers/types/customer.types";
import LedgerEntryFormDialog from "@/features/ledger/components/LedgerEntryFormDialog";
import {
  useDeleteLedgerEntry,
  useLedgerEntries,
} from "@/features/ledger/hooks/useLedgerEntries";
import type { LedgerEntry } from "@/features/ledger/types/ledger.types";

type AccountType = "distributor" | "retailer";

interface EntryWithBalance extends LedgerEntry {
  closingBalance: number;
}

const EMPTY_ENTRIES: LedgerEntry[] = [];

const money = (amount: number) =>
  `₹${Math.abs(amount).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(date),
  );

const errorMessage = (error: Error) =>
  error instanceof AxiosError
    ? (error.response?.data?.error?.message ?? error.message)
    : error.message;

function downloadCsv(customer: Customer, entries: EntryWithBalance[]) {
  const quote = (value: string | number) =>
    `"${String(value).replace(/"/g, '""')}"`;
  const lines = [
    ["Date", "Particulars", "Type", "Debit", "Credit", "Balance"],
    ...entries.map((entry) => [
      entry.date.slice(0, 10),
      entry.particulars,
      entry.type,
      entry.type === "DEBIT" ? entry.amount : "",
      entry.type === "CREDIT" ? entry.amount : "",
      `${entry.closingBalance.toFixed(2)} ${entry.closingBalance >= 0 ? "Dr" : "Cr"}`,
    ]),
  ];
  const blob = new Blob(
    [lines.map((line) => line.map(quote).join(",")).join("\r\n")],
    { type: "text/csv;charset=utf-8" },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${customer.shopName.replace(/[^a-z0-9-_]+/gi, "-")}-ledger.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function Ledger() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>("distributor");
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<LedgerEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<LedgerEntry | null>(null);

  const customersQuery = useGetCustomers();
  const customers: Customer[] = customersQuery.data?.data ?? [];
  const accounts = customers.filter((customer) =>
    accountType === "retailer"
      ? customer.type === "RETAILER"
      : customer.type !== "RETAILER",
  );

  useEffect(() => {
    if (!accounts.some((customer) => customer.id === selectedCustomerId)) {
      setSelectedCustomerId(accounts[0]?.id ?? "");
    }
  }, [accounts, selectedCustomerId]);

  const customer =
    accounts.find((account) => account.id === selectedCustomerId) ?? null;
  const entriesQuery = useLedgerEntries(customer?.id ?? null);
  const entries = entriesQuery.data?.data ?? EMPTY_ENTRIES;
  const deleteMutation = useDeleteLedgerEntry(customer?.id ?? "");
  const entryRows = useMemo(() => {
    let balance = Number(customer?.openingBal ?? 0);
    return entries.map((entry) => {
      balance += entry.type === "DEBIT" ? entry.amount : -entry.amount;
      return { ...entry, closingBalance: balance };
    });
  }, [customer?.openingBal, entries]);

  const totalDebit = entries.reduce(
    (total, entry) => total + (entry.type === "DEBIT" ? entry.amount : 0),
    0,
  );
  const totalCredit = entries.reduce(
    (total, entry) => total + (entry.type === "CREDIT" ? entry.amount : 0),
    0,
  );
  const openingBalance = Number(customer?.openingBal ?? 0);
  const outstanding = openingBalance + totalDebit - totalCredit;
  const filteredEntries = entryRows.filter((entry) => {
    const query = search.trim().toLowerCase();
    const entryDate = entry.date.slice(0, 10);
    return (
      (!query ||
        entry.particulars.toLowerCase().includes(query) ||
        entry.type.toLowerCase().includes(query)) &&
      (!fromDate || entryDate >= fromDate) &&
      (!toDate || entryDate <= toDate)
    );
  });

  const openCreate = () => {
    setEditingEntry(null);
    setFormOpen(true);
  };

  const openEdit = (entry: LedgerEntry) => {
    setEditingEntry(entry);
    setFormOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <IconBook size={16} className="text-primary" />
          Customer account balances and transaction history
        </div>
        {customer && (
          <Button
            variant="outline"
            className="h-9 gap-1.5"
            disabled={filteredEntries.length === 0}
            onClick={() => downloadCsv(customer, filteredEntries)}
          >
            <IconDownload size={15} /> Export CSV
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant={accountType === "distributor" ? "default" : "outline"}
          className="h-9 gap-1.5"
          onClick={() => setAccountType("distributor")}
        >
          <IconTruckDelivery size={14} /> Distributor ledger
        </Button>
        <Button
          variant={accountType === "retailer" ? "default" : "outline"}
          className="h-9 gap-1.5"
          onClick={() => setAccountType("retailer")}
        >
          <IconBuildingStore size={14} /> Retailer ledger
        </Button>
      </div>

      {customersQuery.isLoading ? (
        <Card className="border border-border shadow-sm">
          <p className="py-12 text-center text-sm text-muted-foreground">
            Loading customer accounts...
          </p>
        </Card>
      ) : customersQuery.isError ? (
        <Card className="space-y-3 border border-border p-8 text-center shadow-sm">
          <p className="text-sm text-destructive">
            {errorMessage(customersQuery.error)}
          </p>
          <div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => customersQuery.refetch()}
            >
              Try again
            </Button>
          </div>
        </Card>
      ) : !customer ? (
        <Card className="space-y-3 border border-border p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            No {accountType === "retailer" ? "retailer" : "distributor"} accounts
            found.
          </p>
          <div>
            <Button
              className="gap-1.5"
              onClick={() => navigate("/customers/new")}
            >
              <IconPlus size={15} /> Add customer
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={customer.id}
              onValueChange={setSelectedCustomerId}
            >
              <SelectTrigger className="h-9 w-full sm:w-64">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.shopName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="relative min-w-[180px] flex-1">
              <IconSearch
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label="Search ledger entries"
                placeholder="Search particulars..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-9 pl-9"
              />
            </div>
            <Input
              aria-label="From date"
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              className="h-9 w-40"
            />
            <Input
              aria-label="To date"
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              className="h-9 w-40"
            />
            <Button className="h-9 gap-1.5" onClick={openCreate}>
              <IconPlus size={15} /> Add entry
            </Button>
          </div>

          <Card className="border border-border shadow-sm">
            <CardContent className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 lg:grid-cols-5">
              {[
                { label: "Account", value: customer.shopName },
                {
                  label: "Opening balance",
                  value: `${money(openingBalance)} ${openingBalance >= 0 ? "Dr" : "Cr"}`,
                },
                {
                  label: "Payment terms",
                  value: `${customer.paymentTerms || "0"} days`,
                },
                {
                  label: "Credit limit",
                  value: money(Number(customer.creditLimit ?? 0)),
                },
                {
                  label: "Outstanding",
                  value: `${money(outstanding)} ${outstanding >= 0 ? "Dr" : "Cr"}`,
                  highlight: outstanding > 0,
                },
              ].map(({ label, value, highlight }) => (
                <div
                  key={label}
                  className={`rounded-xl p-3 ${highlight ? "border border-red-100 bg-red-50" : "bg-muted/50"}`}
                >
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p
                    className={`mt-0.5 truncate text-sm font-semibold ${highlight ? "text-red-700" : "text-foreground"}`}
                    title={value}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="overflow-hidden border border-border shadow-sm">
            {entriesQuery.isLoading ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Loading ledger entries...
              </p>
            ) : entriesQuery.isError ? (
              <div className="space-y-3 py-8 text-center">
                <p className="text-sm text-destructive">
                  {errorMessage(entriesQuery.error)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => entriesQuery.refetch()}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        {[
                          "Date",
                          "Particulars",
                          "Type",
                          "Debit (₹)",
                          "Credit (₹)",
                          "Balance (₹)",
                          "Actions",
                        ].map((heading) => (
                          <TableHead
                            key={heading}
                            className="whitespace-nowrap text-xs font-semibold"
                          >
                            {heading}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEntries.map((entry) => (
                        <TableRow
                          key={entry.id}
                          className={`hover:bg-muted/30 ${entry.type === "CREDIT" ? "bg-emerald-50/30" : ""}`}
                        >
                          <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                            {dateLabel(entry.date)}
                          </TableCell>
                          <TableCell className="max-w-[260px] truncate text-sm font-medium">
                            {entry.particulars}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-medium ${entry.type === "DEBIT" ? "text-red-600" : "text-emerald-600"}`}
                            >
                              {entry.type === "DEBIT" ? (
                                <IconArrowDownRight size={12} />
                              ) : (
                                <IconArrowUpRight size={12} />
                              )}
                              {entry.type[0] +
                                entry.type.slice(1).toLowerCase()}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm font-medium text-red-700">
                            {entry.type === "DEBIT"
                              ? money(entry.amount)
                              : "—"}
                          </TableCell>
                          <TableCell className="text-sm font-medium text-emerald-700">
                            {entry.type === "CREDIT"
                              ? money(entry.amount)
                              : "—"}
                          </TableCell>
                          <TableCell
                            className={`whitespace-nowrap text-sm font-bold ${entry.closingBalance >= 0 ? "text-red-600" : "text-emerald-600"}`}
                          >
                            {money(entry.closingBalance)}
                            <span className="ml-1 text-xs font-normal">
                              {entry.closingBalance >= 0 ? "Dr" : "Cr"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Edit ${entry.particulars}`}
                                onClick={() => openEdit(entry)}
                              >
                                <IconEdit size={15} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Delete ${entry.particulars}`}
                                onClick={() => setDeletingEntry(entry)}
                              >
                                <IconTrash
                                  size={15}
                                  className="text-destructive"
                                />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredEntries.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="h-24 text-center text-muted-foreground"
                          >
                            {entries.length === 0
                              ? "No ledger entries yet. Add the first entry to this account."
                              : "No entries match your filters."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex flex-wrap justify-between gap-2 border-t border-border bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
                  <span>
                    {filteredEntries.length} of {entries.length} entries
                  </span>
                  <span>
                    Debit: {money(totalDebit)} · Credit: {money(totalCredit)}
                  </span>
                </div>
              </>
            )}
          </Card>
        </>
      )}

      {customer && (
        <LedgerEntryFormDialog
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setEditingEntry(null);
          }}
          customerId={customer.id}
          entry={editingEntry}
        />
      )}

      <AlertDialog
        open={Boolean(deletingEntry)}
        onOpenChange={(open) => !open && setDeletingEntry(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this ledger entry?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deletingEntry?.particulars}” will be removed from the account
              ledger. The record will be retained for audit purposes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                if (!deletingEntry) return;
                deleteMutation.mutate(deletingEntry.id, {
                  onSuccess: () => setDeletingEntry(null),
                });
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete entry"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
