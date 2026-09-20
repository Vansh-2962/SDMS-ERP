import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconFileInvoice,
  IconTruckDelivery,
  IconFileText,
  IconReceiptRefund,
  IconReceiptOff,
  IconCheck,
  IconPrinter,
  IconDownload,
  IconBrandWhatsapp,
  IconBuildingFactory,
} from "@tabler/icons-react";

type DocType = "invoice" | "challan" | "proforma" | "credit" | "debit";

const DOC_CONFIG: Record<
  DocType,
  { label: string; prefix: string; icon: typeof IconFileInvoice; color: string }
> = {
  invoice: {
    label: "Tax Invoice",
    prefix: "INV",
    icon: IconFileInvoice,
    color: "text-violet-600 bg-violet-50",
  },
  challan: {
    label: "Delivery Challan",
    prefix: "DC",
    icon: IconTruckDelivery,
    color: "text-blue-600 bg-blue-50",
  },
  proforma: {
    label: "Proforma Invoice",
    prefix: "PI",
    icon: IconFileText,
    color: "text-emerald-600 bg-emerald-50",
  },
  credit: {
    label: "Credit Note",
    prefix: "CN",
    icon: IconReceiptRefund,
    color: "text-amber-600 bg-amber-50",
  },
  debit: {
    label: "Debit Note",
    prefix: "DN",
    icon: IconReceiptOff,
    color: "text-rose-600 bg-rose-50",
  },
};

interface LineItem {
  productId: string;
  name: string;
  hsn: string;
  qty: number;
  rate: number;
  gst: number;
  discount: number;
  amount: number;
}

export default function BillingEditor() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const { customers, products } = useAppStore();

  const docType = (
    Object.keys(DOC_CONFIG).includes(type || "") ? type : "invoice"
  ) as DocType;
  const config = DOC_CONFIG[docType];
  const Icon = config.icon;

  const [docNo] = useState(
    `${config.prefix}-2024-${String(Math.floor(Math.random() * 9000) + 1000)}`,
  );
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [customerId, setCustomerId] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("30 days");
  const [dueDate, setDueDate] = useState("");
  const [transportMode, setTransportMode] = useState("Road");
  const [vehicleNo, setVehicleNo] = useState("");
  const [eWayBill, setEWayBill] = useState("");
  const [supplyType, setSupplyType] = useState("Taxable");
  const [reverseCharge, setReverseCharge] = useState(false);
  const [placeOfSupply, setPlaceOfSupply] = useState("Karnataka (29)");
  const [referenceNo, setReferenceNo] = useState("");
  const [referenceDate, setReferenceDate] = useState("");
  const [reason, setReason] = useState("");
  const [items, setItems] = useState<LineItem[]>([]);
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState(
    "Goods once sold will not be taken back. Subject to local jurisdiction only.",
  );

  const customer = customers.find((c) => c.id === customerId);

  const addLine = () => {
    setItems([
      ...items,
      {
        productId: "",
        name: "",
        hsn: "",
        qty: 1,
        rate: 0,
        gst: 5,
        discount: 0,
        amount: 0,
      },
    ]);
  };

  const updateLine = (
    i: number,
    field: keyof LineItem,
    value: string | number,
  ) => {
    setItems((prev) =>
      prev.map((line, idx) => {
        if (idx !== i) return line;
        const updated = { ...line, [field]: value };
        if (field === "productId") {
          const prod = products.find((p) => p.id === value);
          if (prod) {
            updated.name = prod.name;
            updated.hsn = prod.hsn;
            updated.rate = prod.distributorPrice;
            updated.gst = prod.gst;
          }
        }
        const base = updated.qty * updated.rate;
        const afterDiscount = base - (base * updated.discount) / 100;
        updated.amount = afterDiscount + (afterDiscount * updated.gst) / 100;
        return updated;
      }),
    );
  };

  const removeLine = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((s, l) => s + l.qty * l.rate, 0);
  const discountTotal = items.reduce(
    (s, l) => s + (l.qty * l.rate * l.discount) / 100,
    0,
  );
  const taxableValue = subtotal - discountTotal;
  const cgst = items.reduce((s, l) => {
    const base = l.qty * l.rate - (l.qty * l.rate * l.discount) / 100;
    return s + (base * l.gst) / 200;
  }, 0);
  const sgst = cgst;
  const igst = items.reduce((s, l) => {
    const base = l.qty * l.rate - (l.qty * l.rate * l.discount) / 100;
    return s + (base * l.gst) / 100;
  }, 0);
  const roundOff =
    Math.round(taxableValue + cgst + sgst + igst) -
    (taxableValue + cgst + sgst + igst);
  const grandTotal = taxableValue + cgst + sgst + igst + roundOff;

  const isInterState = customer && customer.state !== "Karnataka";
  const gstBreakdown = isInterState
    ? { igst, cgst: 0, sgst: 0 }
    : { igst: 0, cgst, sgst };

  const showTransport = docType === "challan" || docType === "invoice";
  const showReference = docType === "credit" || docType === "debit";
  const showReason = docType === "credit" || docType === "debit";
  const showSupplyType = docType === "invoice" || docType === "proforma";
  const showDueDate =
    docType === "invoice" || docType === "proforma" || docType === "credit";
  const showGST = docType !== "challan";
  const showDiscount =
    docType === "invoice" || docType === "proforma" || docType === "debit";

  const docLabel = config.label;
  const canSave = customerId && items.length > 0;

  const handleCustomerChange = (id: string) => {
    setCustomerId(id);
    const c = customers.find((x) => x.id === id);
    if (c) {
      setBillingAddress(
        `${c.address}, ${c.district}, ${c.state} - ${c.pincode}`,
      );
      setShippingAddress(
        `${c.address}, ${c.district}, ${c.state} - ${c.pincode}`,
      );
      setPaymentTerms(c.paymentTerms);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/billing")}
            className="h-8 w-8"
          >
            <IconArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${config.color}`}
            >
              <Icon size={20} />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-foreground leading-tight">
                Create {docLabel}
              </h2>
              <p className="text-xs text-muted-foreground">
                Document No:{" "}
                <span className="font-mono font-medium text-foreground">
                  {docNo}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <IconPrinter size={15} /> Print
          </Button>
          <Button variant="outline" size="sm" className="h-9 gap-1.5">
            <IconDownload size={15} /> PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5 text-emerald-600 border-emerald-200"
          >
            <IconBrandWhatsapp size={15} /> WhatsApp
          </Button>
        </div>
      </div>

      {/* Doc type switcher */}
      <Tabs
        value={docType}
        onValueChange={(v) => navigate(`/billing/new/${v}`)}
      >
        <TabsList className="bg-muted/60 p-1 gap-1 w-fit">
          {(Object.keys(DOC_CONFIG) as DocType[]).map((t) => {
            const cfg = DOC_CONFIG[t];
            const TIcon = cfg.icon;
            return (
              <TabsTrigger key={t} value={t} className="text-xs gap-1.5">
                <TIcon size={14} /> {cfg.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/billing");
        }}
      >
        {/* Party Details */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconBuildingFactory size={15} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-foreground">
                Party Details
              </h3>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {docType === "credit" || docType === "debit"
                    ? "Party *"
                    : "Customer *"}
                </Label>
                <Select value={customerId} onValueChange={handleCustomerChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {customers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.shopName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Document Date
                </Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              {showDueDate && (
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Due Date
                  </Label>
                  <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Payment Terms
                </Label>
                <Select value={paymentTerms} onValueChange={setPaymentTerms}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "15 days",
                      "30 days",
                      "45 days",
                      "60 days",
                      "Immediate",
                      "Advance",
                    ].map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {customer && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Billing Address
                  </p>
                  <p className="text-sm text-foreground">{customer.shopName}</p>
                  <p className="text-xs text-muted-foreground">
                    {billingAddress}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    GSTIN: {customer.gst}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border border-border space-y-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Shipping Address
                  </p>
                  <Input
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="h-8 text-xs mt-1"
                    placeholder="Shipping address"
                  />
                </div>
              </div>
            )}

            {/* Reference fields for credit/debit notes */}
            {showReference && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Reference Invoice No
                  </Label>
                  <Input
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    placeholder="Original invoice number"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Reference Date
                  </Label>
                  <Input
                    type="date"
                    value={referenceDate}
                    onChange={(e) => setReferenceDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Reason for credit/debit note */}
            {showReason && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Reason for {docLabel}
                </Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    {docType === "credit"
                      ? [
                          "Sales Return",
                          "Post-sale Discount",
                          "Rate Difference",
                          "Quality Rejection",
                          "Excess Billing Correction",
                        ].map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))
                      : [
                          "Rate Increase",
                          "Short Billing",
                          "Additional Charges",
                          "Tax Adjustment",
                          "Quantity Short Supply",
                        ].map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Supply type & reverse charge for invoices/proforma */}
            {showSupplyType && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Supply Type
                  </Label>
                  <Select value={supplyType} onValueChange={setSupplyType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["Taxable", "Exempt", "Export", "SEZ", "Non-GST"].map(
                        (s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Place of Supply
                  </Label>
                  <Select
                    value={placeOfSupply}
                    onValueChange={setPlaceOfSupply}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-52">
                      {[
                        "Karnataka (29)",
                        "Tamil Nadu (33)",
                        "Delhi (07)",
                        "Gujarat (24)",
                        "Telangana (36)",
                        "Maharashtra (27)",
                      ].map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reverseCharge}
                      onChange={(e) => setReverseCharge(e.target.checked)}
                      className="rounded border-border"
                    />
                    Reverse Charge
                  </label>
                </div>
              </div>
            )}

            {/* Transport details for challan/invoice */}
            {showTransport && (
              <>
                <Separator />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Transport Mode
                    </Label>
                    <Select
                      value={transportMode}
                      onValueChange={setTransportMode}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Road", "Rail", "Air", "Ship", "Courier"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Vehicle Number
                    </Label>
                    <Input
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
                      placeholder="KA01 AB 1234"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      E-Way Bill No
                    </Label>
                    <Input
                      value={eWayBill}
                      onChange={(e) => setEWayBill(e.target.value)}
                      placeholder="381234567890"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Delivery Date
                    </Label>
                    <Input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pt-5 px-6 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-sm text-foreground">
                Item Details
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLine}
                className="h-8 gap-1.5"
              >
                <IconPlus size={14} /> Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed border-border rounded-xl">
                No items added. Click "Add Item" to start billing.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <div className="min-w-[800px] space-y-2">
                  {/* Header row */}
                  <div className="grid grid-cols-[2fr_0.8fr_0.7fr_0.7fr_0.6fr_0.8fr_0.8fr_auto] gap-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide pb-1 border-b border-border">
                    <span>Product</span>
                    <span>HSN</span>
                    <span>Qty</span>
                    <span>Rate (₹)</span>
                    {showDiscount && <span>Disc %</span>}
                    {showGST && <span>GST %</span>}
                    <span className="text-right">Amount (₹)</span>
                    <span />
                  </div>
                  {items.map((line, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[2fr_0.8fr_0.7fr_0.7fr_0.6fr_0.8fr_0.8fr_auto] gap-2 items-center"
                    >
                      <Select
                        value={line.productId}
                        onValueChange={(v) => updateLine(i, "productId", v)}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent className="max-h-52">
                          {products.map((p) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={line.hsn}
                        readOnly
                        className="h-8 text-xs bg-muted"
                      />
                      <Input
                        type="number"
                        min={1}
                        value={line.qty}
                        onChange={(e) =>
                          updateLine(i, "qty", Number(e.target.value))
                        }
                        className="h-8 text-xs"
                      />
                      <Input
                        type="number"
                        value={line.rate}
                        onChange={(e) =>
                          updateLine(i, "rate", Number(e.target.value))
                        }
                        className="h-8 text-xs"
                      />
                      {showDiscount ? (
                        <Input
                          type="number"
                          min={0}
                          max={100}
                          value={line.discount}
                          onChange={(e) =>
                            updateLine(i, "discount", Number(e.target.value))
                          }
                          className="h-8 text-xs"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground text-center">
                          —
                        </span>
                      )}
                      {showGST ? (
                        <Input
                          value={`${line.gst}%`}
                          readOnly
                          className="h-8 text-xs bg-muted"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground text-center">
                          N/A
                        </span>
                      )}
                      <span className="font-semibold text-sm text-right">
                        ₹{line.amount.toFixed(0)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive"
                        onClick={() => removeLine(i)}
                      >
                        <IconTrash size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes & Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5 space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Notes
              </Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes for this document..."
                rows={3}
                className="text-sm resize-none"
              />
            </CardContent>
          </Card>
          <Card className="border border-border shadow-sm">
            <CardContent className="p-5 space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Terms & Conditions
              </Label>
              <Textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                rows={3}
                className="text-sm resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <div className="max-w-sm ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {showDiscount && discountTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-red-600">
                    −₹{discountTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Taxable Value</span>
                <span>₹{taxableValue.toLocaleString("en-IN")}</span>
              </div>
              {showGST && (
                <>
                  {isInterState ? (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">IGST</span>
                      <span>₹{gstBreakdown.igst.toLocaleString("en-IN")}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">CGST</span>
                        <span>
                          ₹{gstBreakdown.cgst.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">SGST</span>
                        <span>
                          ₹{gstBreakdown.sgst.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
              {roundOff !== 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Round Off</span>
                  <span>₹{roundOff.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-base font-heading font-bold">
                <span>Grand Total</span>
                <span className="text-primary">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Amount in words</span>
                <span className="italic">Rupees only</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action bar */}
        <div className="flex items-center justify-between gap-3 pb-6">
          <div className="text-xs text-muted-foreground">
            {canSave ? (
              <span className="flex items-center gap-1.5 text-emerald-600">
                <IconCheck size={14} /> Ready to save
              </span>
            ) : (
              <span>Select a customer and add at least one item to save.</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/billing")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!canSave} className="gap-1.5 px-6">
              <IconCheck size={16} /> Save {docLabel}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
