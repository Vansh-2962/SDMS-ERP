import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import {
  IconFileInvoice,
  IconPlus,
  IconDownload,
  IconBrandWhatsapp,
  IconMail,
  IconQrcode,
  IconPrinter,
  IconSearch,
  IconEye,
  IconFileText,
  IconReceiptRefund,
} from "@tabler/icons-react";
import { useGetInvoices } from "@/features/invoice/hooks/useGetInvoices";
import InvoiceStats from "@/features/invoice/components/InvoiceStats";
import {
  InvoiceStatus,
  InvoiceType,
} from "@/features/invoice/types/invoice.types";
import { formatDate } from "@/lib/helpers";
import ProductListSkeleton from "@/features/product/component/ProductListSkeleton";
import InvoicesNotFound from "@/features/invoice/components/InvoicesNotFound";

const invoices = [
  {
    id: "INV-2024-001",
    date: "2024-03-15",
    customer: "Ravi Distributors",
    taxable: 9200,
    gst: 460,
    total: 9660,
    status: "Paid",
  },
  {
    id: "INV-2024-002",
    date: "2024-03-16",
    customer: "Metro Supermarket",
    taxable: 9200,
    gst: 1104,
    total: 10304,
    status: "Pending",
  },
  {
    id: "INV-2024-003",
    date: "2024-03-17",
    customer: "Spice Mart Retail",
    taxable: 1500,
    gst: 75,
    total: 1575,
    status: "Paid",
  },
  {
    id: "INV-2024-004",
    date: "2024-03-18",
    customer: "North India Traders",
    taxable: 34000,
    gst: 4080,
    total: 38080,
    status: "Overdue",
  },
];

const challans = [
  {
    id: "DC-2024-001",
    date: "2024-03-15",
    customer: "Ravi Distributors",
    taxable: 9200,
    gst: 0,
    total: 9200,
    status: "Delivered",
  },
  {
    id: "DC-2024-002",
    date: "2024-03-18",
    customer: "North India Traders",
    taxable: 34000,
    gst: 0,
    total: 34000,
    status: "In Transit",
  },
];

const proformas = [
  {
    id: "PI-2024-001",
    date: "2024-03-10",
    customer: "Kerala Spice Hub",
    taxable: 18000,
    gst: 900,
    total: 18900,
    status: "Draft",
  },
];

const creditNotes = [
  {
    id: "CN-2024-001",
    date: "2024-03-12",
    customer: "Ravi Distributors",
    taxable: 3200,
    gst: 160,
    total: 3360,
    status: "Issued",
  },
];

const debitNotes = [
  {
    id: "DN-2024-001",
    date: "2024-03-14",
    customer: "Spice Mart Retail",
    taxable: 500,
    gst: 25,
    total: 525,
    status: "Issued",
  },
];

const statusColor: Record<InvoiceStatus, string> = {
  DRAFT: "bg-pink-100 text-pink-700",
  ISSUED: "bg-amber-100 text-amber-700",
  OVERDUE: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-rose-100 text-rose-600",
  PAID: "bg-emerald-100 text-emerald-700",
  PARTIALLY_PAID: "bg-blue-100 text-blue-700",
  VOID: "bg-violet-100 text-violet-700",
};

function DocTable({
  invoices,
  type,
  routeType,
  loading,
}: {
  invoices: InvoiceType[];
  type: string;
  routeType: string;
  loading: boolean;
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = invoices.filter(
    (d) =>
      d.customer.shopName.includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div className="relative w-64">
          <IconSearch
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm"
          />
        </div>
        <Button
          size="sm"
          className="h-8 gap-1.5"
          onClick={() => navigate(`/billing/new/${routeType}`)}
        >
          <IconPlus size={13} /> New {type}
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        {loading ? (
          <ProductListSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {[
                  "Doc No.",
                  "Date",
                  "Customer",
                  "Taxable",
                  "GST",
                  "Total",
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
              {filtered.map((d: InvoiceType) => (
                <TableRow key={d.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs text-primary font-medium">
                    {d.docNo}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(d.date)}
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {d.customer.shopName}
                  </TableCell>
                  <TableCell className="text-sm">
                    ₹{d.taxable.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    ₹
                    {Number(
                      Number(d.gst.igst) +
                        Number(d.gst.cgst) +
                        Number(d.gst.sgst),
                    ).toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    ₹{d.grandTotal.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[d.status] || "bg-gray-100 text-gray-600"}`}
                    >
                      {d.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                        title="View"
                      >
                        <IconEye size={13} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-primary"
                        title="Download PDF"
                      >
                        <IconDownload size={13} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-emerald-600"
                        title="Send WhatsApp"
                      >
                        <IconBrandWhatsapp size={13} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-blue-600"
                        title="Send Email"
                      >
                        <IconMail size={13} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {filtered.length === 0 && !loading && <InvoicesNotFound />}
        <div className="px-4 py-2 border-t border-border bg-muted/20 text-xs text-muted-foreground">
          Showing {filtered.length} of {filtered.length} invoices
        </div>
      </div>
    </div>
  );
}

export default function BillingList() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const { data, isLoading } = useGetInvoices();

  const invoices =
    data?.data.filter((d: InvoiceType) => d.label === "TAX_INVOICE") || [];
  const challans =
    data?.data.filter((d: InvoiceType) => d.label === "DELIVERY_CHALLAN") || [];
  const proformas =
    data?.data.filter((d: InvoiceType) => d.label === "PROFORMA_INVOICE") || [];
  const creditNotes =
    data?.data.filter((d: InvoiceType) => d.label === "CREDIT_NOTE") || [];
  const debitNotes =
    data?.data.filter((d: InvoiceType) => d.label === "DEBIT_NOTE") || [];

  return (
    <div className="space-y-5">
      <InvoiceStats invoices={data?.data} />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5"
            onClick={() => setPreviewOpen(true)}
          >
            <IconQrcode size={14} /> QR Invoice
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <IconPrinter size={14} /> Print
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5">
            <IconDownload size={14} /> Export PDF
          </Button>
        </div>
      </div>

      <Tabs defaultValue="invoice">
        <TabsList className="bg-muted/60 p-1 gap-1">
          <TabsTrigger value="invoice" className="text-xs">
            Tax Invoice
          </TabsTrigger>
          <TabsTrigger value="challan" className="text-xs">
            Delivery Challan
          </TabsTrigger>
          <TabsTrigger value="proforma" className="text-xs">
            Proforma
          </TabsTrigger>
          <TabsTrigger value="credit" className="text-xs">
            Credit Note
          </TabsTrigger>
          <TabsTrigger value="debit" className="text-xs">
            Debit Note
          </TabsTrigger>
        </TabsList>
        <TabsContent value="invoice" className="mt-4">
          <DocTable
            invoices={invoices}
            type="Invoice"
            routeType="invoice"
            loading={isLoading}
          />
        </TabsContent>
        <TabsContent value="challan" className="mt-4">
          <DocTable
            invoices={challans}
            type="Challan"
            routeType="challan"
            loading={isLoading}
          />
        </TabsContent>
        <TabsContent value="proforma" className="mt-4">
          <DocTable
            invoices={proformas}
            type="Proforma"
            routeType="proforma"
            loading={isLoading}
          />
        </TabsContent>
        <TabsContent value="credit" className="mt-4">
          <DocTable
            invoices={creditNotes}
            type="Credit Note"
            routeType="credit"
            loading={isLoading}
          />
        </TabsContent>
        <TabsContent value="debit" className="mt-4">
          <DocTable
            invoices={debitNotes}
            type="Debit Note"
            routeType="debit"
            loading={isLoading}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading">
              Invoice Preview — INV-2024-001
            </DialogTitle>
          </DialogHeader>
          <div className="border border-border rounded-xl p-6 space-y-4 bg-white text-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-heading font-bold text-xl text-foreground">
                  GoldSpice Industries
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  12, Industrial Area, Bangalore — 560001
                </p>
                <p className="text-xs text-muted-foreground">
                  GSTIN: 29AABCU9603R1ZX
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg">
                  TAX INVOICE
                </span>
                <p className="text-xs text-muted-foreground mt-2">
                  INV-2024-001
                </p>
                <p className="text-xs text-muted-foreground">
                  Date: 15-Mar-2024
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="font-semibold mb-1">Bill To</p>
                <p className="text-muted-foreground">Ravi Distributors</p>
                <p className="text-muted-foreground">GSTIN: 29AABCU9603R1ZX</p>
                <p className="text-muted-foreground">
                  12, Market Road, Bangalore
                </p>
              </div>
              <div className="text-right">
                <div className="inline-block w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                  <IconQrcode size={40} className="text-muted-foreground" />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Scan for verification
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border">
              <table className="w-full text-xs">
                <thead className="bg-muted/50">
                  <tr>
                    {[
                      "#",
                      "Product",
                      "HSN",
                      "Qty",
                      "Rate",
                      "GST",
                      "Amount",
                    ].map((h) => (
                      <th key={h} className="px-3 py-2 text-left font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="px-3 py-2">1</td>
                    <td className="px-3 py-2">Turmeric Powder 100g</td>
                    <td className="px-3 py-2">0910</td>
                    <td className="px-3 py-2">100</td>
                    <td className="px-3 py-2">₹32</td>
                    <td className="px-3 py-2">5%</td>
                    <td className="px-3 py-2 font-medium">₹3,360</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-right space-y-1 text-xs">
              <p>Subtotal: ₹9,200</p>
              <p>CGST (2.5%): ₹230 | SGST (2.5%): ₹230</p>
              <p className="font-bold text-base text-primary">
                Grand Total: ₹9,660
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm" className="gap-1.5">
              <IconPrinter size={14} />
              Print
            </Button>
            <Button size="sm" className="gap-1.5">
              <IconDownload size={14} />
              Download PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-emerald-600 border-emerald-200"
            >
              <IconBrandWhatsapp size={14} />
              WhatsApp
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
