import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  IconCreditCard,
  IconSearch,
  IconPlus,
  IconBuildingBank,
  IconDeviceMobile,
  IconCash,
  IconWriting,
  IconBell,
  IconCheck,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { useGetPayments } from "@/features/payment/hooks/useGetPayments";
import {
  useCreatePayment,
  useDeletePayment,
  useUpdatePayment,
} from "@/features/payment/hooks/usePaymentMutations";
import { useGetInvoices } from "@/features/invoice/hooks/useGetInvoices";
import type {
  PaymentMode,
  PaymentRecord,
  PaymentStatus,
} from "@/features/payment/types/payment.types";

const modeIcon = {
  CASH: IconCash,
  UPI: IconDeviceMobile,
  NEFT: IconBuildingBank,
  CHEQUE: IconWriting,
};

const statusColor: Record<string, string> = {
  Received: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-700",
};

const emptyPayments: PaymentRecord[] = [];

const localDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const displayDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("en-IN") : "—";

const paymentStatusLabel = (payment: PaymentRecord) => {
  if (payment.status === "RECEIVED") return "Received";
  return new Date(payment.dueDate) < new Date(localDateValue(new Date()))
    ? "Overdue"
    : "Pending";
};

export default function PaymentList() {
  const { data: paymentResponse, isLoading, isError } = useGetPayments();
  const { data: invoiceResponse } = useGetInvoices();
  const { mutate: createPayment, isPending: isCreating } = useCreatePayment();
  const { mutate: updatePayment, isPending: isUpdating } = useUpdatePayment();
  const { mutate: deletePayment } = useDeletePayment();
  const payments = paymentResponse?.data ?? emptyPayments;
  const invoices = invoiceResponse?.data ?? [];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All");
  const [recordOpen, setRecordOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<PaymentMode>("CASH");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("PENDING");
  const [utr, setUtr] = useState("");
  const [recDate, setRecDate] = useState("");

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.customerName.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q) ||
      p.invoiceNo.toLowerCase().includes(q);
    const matchStatus =
      statusFilter === "All" || paymentStatusLabel(p) === statusFilter;
    const matchMode = modeFilter === "All" || p.mode === modeFilter;
    return matchSearch && matchStatus && matchMode;
  });

  const collectionTrend = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const day = new Date(today);
      day.setDate(today.getDate() - (6 - index));
      const dateKey = localDateValue(day);
      const amount = payments
        .filter(
          (payment) =>
            payment.status === "RECEIVED" &&
            payment.date?.slice(0, 10) === dateKey,
        )
        .reduce((total, payment) => total + payment.amount, 0);
      return {
        day: day.toLocaleDateString("en-IN", { weekday: "short" }),
        amount,
      };
    });
  }, [payments]);

  const totalCollected = payments
    .filter((p) => p.status === "RECEIVED")
    .reduce((s, p) => s + p.amount, 0);
  const outstanding = payments
    .filter((p) => paymentStatusLabel(p) !== "Received")
    .reduce((s, p) => s + p.amount, 0);
  const overdue = payments
    .filter((p) => paymentStatusLabel(p) === "Overdue")
    .reduce((s, p) => s + p.amount, 0);
  const thisMonthKey = localDateValue(new Date()).slice(0, 7);
  const thisMonth = payments
    .filter(
      (p) => p.status === "RECEIVED" && p.date?.slice(0, 7) === thisMonthKey,
    )
    .reduce((s, p) => s + p.amount, 0);

  const resetForm = () => {
    setSelectedId("");
    setInvoiceId("");
    setAmount("");
    setMode("CASH");
    setPaymentStatus("PENDING");
    setUtr("");
    setRecDate("");
  };

  const openCreateDialog = () => {
    resetForm();
    setRecordOpen(true);
  };

  const openEditDialog = (payment: PaymentRecord, collect = false) => {
    setSelectedId(payment.id);
    setInvoiceId(payment.invoiceId);
    setAmount(String(payment.amount));
    setMode(payment.mode);
    setPaymentStatus(collect ? "RECEIVED" : payment.status);
    setUtr(payment.utrRef ?? "");
    setRecDate(
      collect
        ? localDateValue(new Date())
        : payment.date
          ? payment.date.slice(0, 10)
          : "",
    );
    setRecordOpen(true);
  };

  const handleSavePayment = () => {
    if (!invoiceId) {
      toast.error("Select an invoice for this payment");
      return;
    }
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      toast.error("Enter a payment amount greater than zero");
      return;
    }

    const payload = {
      invoiceId,
      amount: Number(amount),
      mode,
      status: paymentStatus,
      ...(recDate && { paymentDate: recDate }),
      utrRef: utr.trim() || undefined,
    };
    const closeDialog = () => setRecordOpen(false);

    if (selectedId) {
      updatePayment({ id: selectedId, ...payload }, { onSuccess: closeDialog });
    } else {
      createPayment(payload, { onSuccess: closeDialog });
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Move this payment to deleted records?")) {
      deletePayment(id);
    }
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Total Collected",
            value: `₹${(totalCollected / 1000).toFixed(0)}k`,
            bg: "bg-emerald-50",
            color: "text-emerald-600",
            icon: IconCheck,
          },
          {
            label: "Outstanding",
            value: `₹${(outstanding / 1000).toFixed(0)}k`,
            bg: "bg-amber-50",
            color: "text-amber-600",
            icon: IconCreditCard,
          },
          {
            label: "Overdue",
            value: `₹${(overdue / 1000).toFixed(0)}k`,
            bg: "bg-red-50",
            color: "text-red-600",
            icon: IconBell,
          },
          {
            label: "This Month",
            value: `₹${(thisMonth / 1000).toFixed(0)}k`,
            bg: "bg-violet-50",
            color: "text-violet-600",
            icon: IconCreditCard,
          },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border border-border shadow-sm">
              <CardContent className={`p-4 ${s.bg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">
                      {s.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {s.label}
                    </p>
                  </div>
                  <Icon size={22} className={s.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart + Overdue */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-semibold">
              Weekly Collection Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={collectionTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(60 8% 88%)"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "hsl(60 5% 44%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(60 5% 44%)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(v: number) => [
                    `₹${v.toLocaleString("en-IN")}`,
                    "Collection",
                  ]}
                  contentStyle={{ borderRadius: 10, fontSize: 12 }}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(262 83% 58%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconBell size={16} className="text-red-500" /> Overdue Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {payments
              .filter((p) => paymentStatusLabel(p) === "Overdue")
              .map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-lg bg-red-50 border border-red-100"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {p.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">{p.invoiceNo}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-bold text-red-700">
                      ₹{p.amount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-red-600">
                      Due: {displayDate(p.dueDate)}
                    </span>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search by customer, invoice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {["All", "Received", "Pending", "Overdue"].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={modeFilter} onValueChange={setModeFilter}>
          <SelectTrigger className="w-32 h-9">
            <SelectValue placeholder="Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="CASH">Cash</SelectItem>
            <SelectItem value="UPI">UPI</SelectItem>
            <SelectItem value="NEFT">NEFT</SelectItem>
            <SelectItem value="CHEQUE">Cheque</SelectItem>
          </SelectContent>
        </Select>
        <Button className="h-9 gap-1.5" onClick={openCreateDialog}>
          <IconPlus size={15} /> Record Payment
        </Button>
      </div>

      {/* Table */}
      <Card className="border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {[
                  "Pay ID",
                  "Customer",
                  "Invoice",
                  "Amount",
                  "Mode",
                  "Date",
                  "Due Date",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-xs font-semibold whitespace-nowrap"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-10 text-center text-muted-foreground"
                  >
                    Loading payments...
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-10 text-center text-destructive"
                  >
                    Could not load payments. Please try again.
                  </TableCell>
                </TableRow>
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-10 text-center text-muted-foreground"
                  >
                    No payments match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((p) => {
                  const displayStatus = paymentStatusLabel(p);
                  const ModeIcon = modeIcon[p.mode] || IconCreditCard;
                  return (
                    <TableRow
                      key={p.id}
                      className={`hover:bg-muted/30 ${displayStatus === "Overdue" ? "bg-red-50/40" : ""}`}
                    >
                      <TableCell className="font-mono text-xs">
                        {p.id}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {p.customerName}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-primary">
                        {p.invoiceNo}
                      </TableCell>
                      <TableCell className="font-semibold text-sm">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <ModeIcon size={13} />
                          <span>
                            {" "}
                            {p.mode === "CASH"
                              ? "Cash"
                              : p.mode === "CHEQUE"
                                ? "Cheque"
                                : p.mode}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {displayDate(p.date)}
                      </TableCell>
                      <TableCell
                        className={`text-xs ${displayStatus === "Overdue" ? "text-red-600 font-medium" : "text-muted-foreground"}`}
                      >
                        {displayDate(p.dueDate)}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[displayStatus] || "bg-gray-100 text-gray-600"}`}
                        >
                          {displayStatus}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {displayStatus !== "Received" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={() => {
                                openEditDialog(p, true);
                              }}
                            >
                              <IconCheck size={12} /> Collect
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            aria-label={`Edit payment ${p.id}`}
                            onClick={() => openEditDialog(p)}
                          >
                            <IconPencil size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            aria-label={`Delete payment ${p.id}`}
                            onClick={() => handleDelete(p.id)}
                          >
                            <IconTrash size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog
        open={recordOpen}
        onOpenChange={(open) => {
          setRecordOpen(open);
          if (!open) resetForm();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">
              {selectedId ? "Update Payment" : "Record Payment"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Invoice</Label>
              <Select value={invoiceId} onValueChange={setInvoiceId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an invoice" />
                </SelectTrigger>
                <SelectContent>
                  {invoices.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      {invoice.docNo} · {invoice.customer.shopName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="payment-amount">Amount (₹)</Label>
                <Input
                  id="payment-amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Mode</Label>
                <Select
                  value={mode}
                  onValueChange={(value) => setMode(value as PaymentMode)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CASH">Cash</SelectItem>
                    <SelectItem value="UPI">UPI</SelectItem>
                    <SelectItem value="NEFT">NEFT</SelectItem>
                    <SelectItem value="CHEQUE">Cheque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={paymentStatus}
                onValueChange={(value) =>
                  setPaymentStatus(value as PaymentStatus)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="RECEIVED">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>UTR / Reference No.</Label>
              <Input
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                placeholder="NEFT ref or cheque no."
              />
            </div>
            <div className="space-y-1.5">
              <Label>Collection Date</Label>
              <Input
                type="date"
                value={recDate}
                onChange={(e) => setRecDate(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRecordOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSavePayment}
              disabled={isCreating || isUpdating}
            >
              {isCreating || isUpdating
                ? "Saving..."
                : selectedId
                  ? "Save Changes"
                  : "Save Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
