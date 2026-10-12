import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";
import { Switch } from "../../components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../components/ui/sheet";
import {
  IconArrowLeft,
  IconAdjustments,
  IconPrinter,
  IconDownload,
  IconBrandWhatsapp,
  IconCheck,
  IconLoader2,
} from "@tabler/icons-react";
import { useGetSaleOrderById } from "@/features/saleOrder/hooks/useGetSaleOrderById";

const ACCENT_PRESETS = [
  { name: "Royal Blue", value: "#2563eb" },
  { name: "Forest Green", value: "#16a34a" },
  { name: "Burgundy", value: "#9f1239" },
  { name: "Amber", value: "#d97706" },
  { name: "Slate", value: "#334155" },
  { name: "Teal", value: "#0d9488" },
];

const FONT_PRESETS = [
  { name: "System", value: "'Inter', sans-serif" },
  { name: "Serif", value: "'Georgia', serif" },
  { name: "Mono", value: "'Courier New', monospace" },
];

function numToWords(num: number): string {
  if (!Number.isFinite(num)) return "Zero";
  const isNegative = num < 0;
  const totalPaise = Math.round(Math.abs(num) * 100);
  const rupees = Math.floor(totalPaise / 100);
  const paise = totalPaise % 100;
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  function twoDigits(n: number): string {
    if (n < 20) return ones[n];
    return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
  }
  function threeDigits(n: number): string {
    const h = Math.floor(n / 100);
    const r = n % 100;
    let str = "";
    if (h) str += ones[h] + " Hundred";
    if (r) str += (h ? " " : "") + twoDigits(r);
    return str;
  }
  let words = "";
  const crore = Math.floor(rupees / 10000000);
  if (crore) words += `${threeDigits(crore)} Crore `;
  const afterCrore = rupees % 10000000;
  const lakh = Math.floor(afterCrore / 100000);
  if (lakh) words += `${threeDigits(lakh)} Lakh `;
  const rem = afterCrore % 100000;
  if (rem >= 1000) {
    words += threeDigits(Math.floor(rem / 1000)) + " Thousand ";
  }
  const rem2 = rem % 1000;
  if (rem2 > 0) words += threeDigits(rem2);
  words = words.trim() || "Zero";
  if (paise > 0) words += ` and ${twoDigits(paise)} Paise`;
  return `${isNegative ? "Minus " : ""}${words}`;
}

export default function InvoiceView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: response, isLoading, isError } = useGetSaleOrderById(id ?? "");
  const order = response?.data;

  // Customization state
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [fontFamily, setFontFamily] = useState("'Inter', sans-serif");
  const [showLogo, setShowLogo] = useState(true);
  const [showGST, setShowGST] = useState(true);
  const [showAmountWords, setShowAmountWords] = useState(true);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [showSignature, setShowSignature] = useState(true);
  const [showTerms, setShowTerms] = useState(true);
  const [showHSN, setShowHSN] = useState(true);
  const [invoiceTitle, setInvoiceTitle] = useState("TAX INVOICE");
  const [companyName, setCompanyName] = useState("GoldSpice Industries");
  const [companyAddress, setCompanyAddress] = useState(
    "12, Industrial Area, Bangalore — 560001",
  );
  const [companyGST, setCompanyGST] = useState("29AABCU9603R1ZX");
  const [bankName, setBankName] = useState("State Bank of India");
  const [bankAcc, setBankAcc] = useState("00112233445");
  const [bankIfsc, setBankIfsc] = useState("SBIN0000123");
  const [termsText, setTermsText] = useState(
    "1. Goods once sold will not be taken back.\n2. Subject to local jurisdiction only.\n3. Interest @18% p.a. on overdue bills.",
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <IconLoader2 size={18} className="animate-spin" />
          Loading sale order and invoice details...
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold text-foreground">
            Invoice not found
          </p>
          <p className="text-sm text-muted-foreground">
            {isError
              ? "The order details could not be loaded."
              : "The order you're looking for doesn't exist."}
          </p>
          <Button onClick={() => navigate("/orders")} className="gap-1.5">
            <IconArrowLeft size={16} /> Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const isInterState =
    Boolean(order.customer.stateCode || order.customer.gstNumber) &&
    Boolean(companyGST.slice(0, 2)) &&
    (order.customer.stateCode || order.customer.gstNumber?.slice(0, 2)) !==
      companyGST.slice(0, 2);
  const cgst = isInterState ? 0 : order.gstAmount / 2;
  const sgst = isInterState ? 0 : order.gstAmount / 2;
  const igst = isInterState ? order.gstAmount : 0;
  const invoiceNumber = `INV-${String(order.saleOrderCode).padStart(5, "0")}`;
  const orderNumber = `SO-${String(order.saleOrderCode).padStart(5, "0")}`;
  const money = (value: number) =>
    `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const orderDate = new Date(order.date);
  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  const customerAddress = [
    order.customer.street,
    order.customer.district,
    order.customer.state,
    order.customer.pincode,
  ]
    .filter(Boolean)
    .join(", ");
  const openWhatsApp = () => {
    const phone = (order.customer.whatsapp || order.customer.mobile).replace(
      /\D/g,
      "",
    );
    const message = `Invoice ${invoiceNumber} for sales order ${orderNumber}. Total: ${money(order.total)}.`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Top toolbar */}
      <div className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-background/95 backdrop-blur border-b border-border print:hidden">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/orders")}
            className="h-8 w-8"
          >
            <IconArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="font-heading font-semibold text-sm text-foreground leading-tight">
              Invoice — <span className="font-mono">{invoiceNumber}</span>
            </h1>
            <p className="text-[10px] text-muted-foreground">
              {order.customer.shopName} · {order.status}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() => setSheetOpen(true)}
          >
            <IconAdjustments size={15} /> Customize
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() => window.print()}
          >
            <IconPrinter size={15} /> Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={() => window.print()}
          >
            <IconDownload size={15} /> PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-emerald-600 border-emerald-200"
            onClick={openWhatsApp}
          >
            <IconBrandWhatsapp size={15} /> WhatsApp
          </Button>
        </div>
      </div>

      {/* Invoice preview area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center print:overflow-visible print:p-0">
        <div
          className="bg-white shadow-lg rounded-lg w-full max-w-[800px] overflow-hidden print:max-w-none print:rounded-none print:shadow-none"
          style={{ fontFamily }}
        >
          {/* Accent top bar */}
          <div style={{ height: 6, background: accentColor }} />

          {/* Invoice header */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              {/* Company info */}
              <div className="space-y-1">
                {showLogo && (
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: accentColor }}
                    >
                      {companyName.charAt(0)}
                    </div>
                  </div>
                )}
                <p className="text-lg font-bold text-gray-900">{companyName}</p>
                <p className="text-xs text-gray-500">{companyAddress}</p>
                <p className="text-xs text-gray-500">GSTIN: {companyGST}</p>
              </div>

              {/* Invoice meta */}
              <div className="text-right space-y-1">
                <span
                  className="inline-block px-4 py-1.5 text-white text-xs font-bold rounded-md"
                  style={{ background: accentColor }}
                >
                  {invoiceTitle}
                </span>
                <p className="text-xs text-gray-500 pt-1">
                  Invoice No:{" "}
                  <span className="font-mono font-medium text-gray-700">
                    {invoiceNumber}
                  </span>
                </p>
                <p className="text-xs text-gray-500">
                  Date:{" "}
                  {orderDate.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-500">
                  Order No: <span className="font-mono">{orderNumber}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Salesman: {order.salesman.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  Salesman ID: {order.salesman.empCode} · {order.salesman.role}
                </p>
                <p className="text-xs text-gray-500">
                  Salesman contact: {order.salesman.mobile}
                  {order.salesman.email ? ` · ${order.salesman.email}` : ""}
                </p>
                <p className="text-xs text-gray-500">
                  Status: <span className="font-medium">{order.status}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Created: {formatDateTime(order.createdAt)}
                </p>
                {order.updatedAt !== order.createdAt && (
                  <p className="text-xs text-gray-500">
                    Last updated: {formatDateTime(order.updatedAt)}
                  </p>
                )}
              </div>
            </div>

            {/* Bill To */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                <p
                  className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: accentColor }}
                >
                  Bill To
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {order.customerName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {order.customer.ownerName}
                </p>
                {customerAddress && (
                  <p className="text-xs text-gray-500">{customerAddress}</p>
                )}
                {order.customer.gstNumber && (
                  <p className="text-xs text-gray-500 mt-1">
                    GSTIN: {order.customer.gstNumber}
                  </p>
                )}
                {order.customer.pan && (
                  <p className="text-xs text-gray-500">
                    PAN: {order.customer.pan}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Phone: {order.customer.mobile}
                  {order.customer.email ? ` · ${order.customer.email}` : ""}
                </p>
                {order.customer.fssai && (
                  <p className="text-xs text-gray-500">
                    FSSAI: {order.customer.fssai}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Customer Code: {order.customer.customerCode}
                </p>
                {order.customer.whatsapp && (
                  <p className="text-xs text-gray-500">
                    WhatsApp: {order.customer.whatsapp}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Account status: {order.customer.status}
                </p>
                {order.customer.latitude && order.customer.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${encodeURIComponent(`${order.customer.latitude},${order.customer.longitude}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-xs underline"
                    style={{ color: accentColor }}
                  >
                    View customer location
                  </a>
                )}
              </div>
              <div className="flex flex-col justify-center p-4 rounded-lg bg-gray-50 border border-gray-100">
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                    Order & Delivery
                  </p>
                  <dl className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between gap-4">
                      <dt>Order reference</dt>
                      <dd className="font-mono font-medium">{orderNumber}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Customer type</dt>
                      <dd className="font-medium">{order.customer.type}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Territory</dt>
                      <dd className="font-medium">{order.customer.salesTerritory || "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Payment terms</dt>
                      <dd className="font-medium">{order.customer.paymentTerms} days</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Credit limit</dt>
                      <dd className="font-medium">{money(order.customer.creditLimit)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Opening balance</dt>
                      <dd className="font-medium">{money(order.customer.openingBal)}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>State code</dt>
                      <dd className="font-medium">{order.customer.stateCode || "—"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt>Assigned salesman</dt>
                      <dd className="font-medium">
                        {order.customer.assignedSalesman
                          ? `${order.customer.assignedSalesman.fullName} (#${order.customer.assignedSalesman.empCode})`
                          : "—"}
                      </dd>
                    </div>
                  </dl>
                </div>
            </div>

            {/* Items table */}
            <div className="rounded-lg overflow-hidden border border-gray-200 mb-6">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: accentColor }}>
                    <th className="px-3 py-2.5 text-left text-white font-semibold w-8">
                      #
                    </th>
                    <th className="px-3 py-2.5 text-left text-white font-semibold">
                      Product / Description
                    </th>
                    {showHSN && (
                      <th className="px-3 py-2.5 text-left text-white font-semibold">
                        HSN
                      </th>
                    )}
                    <th className="px-3 py-2.5 text-right text-white font-semibold">
                      Qty
                    </th>
                    <th className="px-3 py-2.5 text-right text-white font-semibold">
                      Rate
                    </th>
                    {showGST && (
                      <th className="px-3 py-2.5 text-right text-white font-semibold">
                        GST%
                      </th>
                    )}
                    <th className="px-3 py-2.5 text-right text-white font-semibold">
                      Taxable
                    </th>
                    {showGST && (
                      <th className="px-3 py-2.5 text-right text-white font-semibold">
                        GST Amt
                      </th>
                    )}
                    <th className="px-3 py-2.5 text-right text-white font-semibold">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr
                      key={item.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-3 py-2.5 text-gray-600">{i + 1}</td>
                      <td className="px-3 py-2.5 font-medium text-gray-900">
                        <p>{item.productName}</p>
                        <p className="mt-0.5 text-[10px] font-normal text-gray-500">
                          {item.product.code}
                          {item.product.category
                            ? ` · ${item.product.category}`
                            : ""}
                          {item.product.type
                            ? ` · ${item.product.type.replace(/_/g, " ")}`
                            : ""}
                          {item.product.brand ? ` · ${item.product.brand}` : ""}
                          {item.product.netWeight
                            ? ` · ${item.product.netWeight}`
                            : ""}
                          {item.product.barcode
                            ? ` · Barcode ${item.product.barcode}`
                            : ""}
                          {item.product.form
                            ? ` · ${item.product.form}`
                            : ""}
                          {item.product.shelfLife
                            ? ` · ${item.product.shelfLife} month shelf life`
                            : ""}
                        </p>
                      </td>
                      {showHSN && (
                        <td className="px-3 py-2.5 text-gray-500 font-mono">
                          {item.product.hsn || "—"}
                        </td>
                      )}
                      <td className="px-3 py-2.5 text-right text-gray-700">
                        {item.qty.toLocaleString("en-IN")} {item.product.unit}
                      </td>
                      <td className="px-3 py-2.5 text-right text-gray-700">
                        {money(item.price)}
                      </td>
                      {showGST && (
                        <td className="px-3 py-2.5 text-right text-gray-500">
                          {item.gst}%
                        </td>
                      )}
                      <td className="px-3 py-2.5 text-right text-gray-700">
                        {money(item.qty * item.price)}
                      </td>
                      {showGST && (
                        <td className="px-3 py-2.5 text-right text-gray-700">
                          {money(item.total - item.qty * item.price)}
                        </td>
                      )}
                      <td className="px-3 py-2.5 text-right font-semibold text-gray-900">
                        {money(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals + Bank */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Bank details / Terms */}
              <div className="space-y-4">
                {showBankDetails && (
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                      style={{ color: accentColor }}
                    >
                      Bank Details
                    </p>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Bank</span>
                        <span className="font-medium">{bankName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>A/C No</span>
                        <span className="font-mono font-medium">{bankAcc}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IFSC</span>
                        <span className="font-mono font-medium">
                          {bankIfsc}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {showTerms && (
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                      style={{ color: accentColor }}
                    >
                      Terms & Conditions
                    </p>
                    <div className="text-[10px] text-gray-500 whitespace-pre-line leading-relaxed">
                      {termsText}
                    </div>
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    {money(order.subtotal)}
                  </span>
                </div>
                {showGST && (
                  <>
                    {isInterState ? (
                      <div className="flex justify-between py-1">
                        <span className="text-gray-500">IGST</span>
                        <span className="font-medium text-gray-900">
                          {money(igst)}
                        </span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">CGST</span>
                          <span className="font-medium text-gray-900">
                            {money(cgst)}
                          </span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-gray-500">SGST</span>
                          <span className="font-medium text-gray-900">
                            {money(sgst)}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between py-1">
                      <span className="text-gray-500">Total GST</span>
                      <span className="font-medium text-gray-900">
                        {money(order.gstAmount)}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between py-1 text-[10px] text-gray-400">
                  <span>Items</span>
                  <span>{order.items.length} line(s)</span>
                </div>
                <Separator className="my-1" />
                <div
                  className="flex justify-between py-2"
                  style={{
                    background: `${accentColor}10`,
                    borderRadius: 6,
                    padding: "6px 12px",
                  }}
                >
                  <span className="font-bold text-sm text-gray-900">
                    Grand Total
                  </span>
                  <span
                    className="font-bold text-base"
                    style={{ color: accentColor }}
                  >
                    {money(order.total)}
                  </span>
                </div>
                {showAmountWords && (
                  <p className="text-[10px] text-gray-400 italic mt-1">
                    Rupees {numToWords(order.total)} Only
                  </p>
                )}
              </div>
            </div>

            {/* Signature */}
            {showSignature && (
              <div className="flex justify-end mt-8">
                <div className="text-center">
                  <div className="w-32 border-b border-gray-300 mb-1" />
                  <p className="text-[10px] text-gray-500">
                    Authorised Signatory
                  </p>
                  <p className="text-[10px] text-gray-400">For {companyName}</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400">
                This is a computer-generated invoice and does not require a
                physical signature.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customization Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md overflow-y-auto print:hidden"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <IconAdjustments size={18} className="text-primary" />
              Customize Invoice
            </SheetTitle>
            <SheetDescription>
              Adjust the appearance and content of your invoice in real time.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Appearance */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Appearance
              </h4>

              <div className="space-y-2">
                <Label className="text-xs">Accent Color</Label>
                <div className="flex flex-wrap gap-2">
                  {ACCENT_PRESETS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => setAccentColor(c.value)}
                      className={`w-8 h-8 rounded-lg transition-all ${accentColor === c.value ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"}`}
                      style={{ background: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-border"
                  />
                  <Input
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="h-8 text-xs font-mono flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Font Family</Label>
                <div className="flex gap-2">
                  {FONT_PRESETS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFontFamily(f.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${fontFamily === f.value ? "border-primary bg-primary/5 text-primary font-medium" : "border-border text-muted-foreground hover:bg-muted"}`}
                      style={{ fontFamily: f.value }}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Company details */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Company Details
              </h4>
              <div className="space-y-2">
                <Label className="text-xs">Invoice Title</Label>
                <Input
                  value={invoiceTitle}
                  onChange={(e) => setInvoiceTitle(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Company Name</Label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Company Address</Label>
                <Input
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Company GSTIN</Label>
                <Input
                  value={companyGST}
                  onChange={(e) => setCompanyGST(e.target.value)}
                  className="h-8 text-sm font-mono"
                />
              </div>
            </div>

            <Separator />

            {/* Bank details */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Bank Details
                </h4>
                <Switch
                  checked={showBankDetails}
                  onCheckedChange={setShowBankDetails}
                />
              </div>
              {showBankDetails && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Bank Name</Label>
                    <Input
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label className="text-xs">A/C Number</Label>
                      <Input
                        value={bankAcc}
                        onChange={(e) => setBankAcc(e.target.value)}
                        className="h-8 text-sm font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">IFSC Code</Label>
                      <Input
                        value={bankIfsc}
                        onChange={(e) => setBankIfsc(e.target.value)}
                        className="h-8 text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Terms */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Terms & Conditions
                </h4>
                <Switch checked={showTerms} onCheckedChange={setShowTerms} />
              </div>
              {showTerms && (
                <div className="space-y-2">
                  <textarea
                    value={termsText}
                    onChange={(e) => setTermsText(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              )}
            </div>

            <Separator />

            {/* Toggles */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Show / Hide Sections
              </h4>
              <div className="space-y-3">
                {[
                  {
                    label: "Company Logo",
                    value: showLogo,
                    setter: setShowLogo,
                  },
                  {
                    label: "GST Breakdown (CGST/SGST/IGST)",
                    value: showGST,
                    setter: setShowGST,
                  },
                  { label: "HSN Column", value: showHSN, setter: setShowHSN },
                  {
                    label: "Amount in Words",
                    value: showAmountWords,
                    setter: setShowAmountWords,
                  },
                  {
                    label: "Signature Block",
                    value: showSignature,
                    setter: setShowSignature,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <Label className="text-xs text-foreground">
                      {item.label}
                    </Label>
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.setter}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSheetOpen(false)}
              >
                Close
              </Button>
              <Button
                className="flex-1 gap-1.5"
                onClick={() => setSheetOpen(false)}
              >
                <IconCheck size={16} /> Done
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
