import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import {
  IconArrowLeft,
  IconPlus,
  IconTrash,
  IconShoppingCart,
} from "@tabler/icons-react";
import { useGetCustomers } from "@/features/customers/hooks/useGetCustomers";
import { Customer } from "@/features/customers/types/customer.types";
import { useGetAllSalesman } from "@/features/employee/hooks/useGetAllSalesman";
import { Employee } from "@/features/employee/types/employee.types";
import { useGetAllProducts } from "@/features/product/hooks/useGetAllProducts";
import { ProductType } from "@/features/product/types/product.types";
import {
  SaleOrderFormData,
  SaleOrderItem,
  SaleOrderStatus,
} from "@/features/saleOrder/types/saleOrder.type";
import { useCreateSaleOrder } from "@/features/saleOrder/hooks/useCreateSaleOrder";
import ButtonLoader from "@/components/ButtonLoader";

export default function OrderForm() {
  const navigate = useNavigate();
  const { addOrder, salesOrders } = useAppStore();
  const [customerId, setCustomerId] = useState("");
  const [salesmanId, setSalesmanId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<SaleOrderStatus>("PENDING");
  const [items, setItems] = useState<SaleOrderItem[]>([]);

  const { data } = useGetCustomers();
  const customers = data?.data ?? [];

  const { data: employees } = useGetAllSalesman();
  const salesmen = employees?.data ?? [];

  const { data: allProducts } = useGetAllProducts();
  const products = allProducts?.data ?? [];

  const { mutate, isPending } = useCreateSaleOrder();

  const addLine = () =>
    setItems([
      ...items,
      { productId: "", productName: "", qty: 1, price: 0, gst: 5, total: 0 },
    ]);

  const updateLine = (
    i: number,
    field: keyof SaleOrderItem,
    value: string | number,
  ) => {
    setItems((prev) =>
      prev.map((line, idx) => {
        if (idx !== i) return line;
        const updated = { ...line, [field]: value };
        if (field === "productId") {
          const prod: ProductType = products.find(
            (p: ProductType) => p.id === value,
          );
          if (prod) {
            updated.productName = prod.productName;
            updated.price = Number(prod.distPrice);
            updated.gst = Number(prod.gst);
          }
        }
        const base = updated.qty * updated.price;
        updated.total = base + (base * updated.gst) / 100;
        return updated;
      }),
    );
  };

  const removeLine = (i: number) =>
    setItems((prev) => prev.filter((_, idx) => idx !== i));

  const subtotal = items.reduce((s, l) => s + l.qty * l.price, 0);
  const gstTotal = items.reduce(
    (s, l) => s + (l.qty * l.price * l.gst) / 100,
    0,
  );
  const grandTotal = subtotal + gstTotal;

  const customer: Customer = customers?.find(
    (c: Customer) => c.id === customerId,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || items.length === 0) return;

    const payload: SaleOrderFormData = {
      customerId,
      customerName: customer?.shopName || "",
      date,
      items,
      subtotal,
      gstAmount: gstTotal,
      total: grandTotal,
      status,
      salesmanId,
    };

    mutate(payload);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/orders")}
          className="h-8 w-8"
        >
          <IconArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="font-heading font-bold text-lg text-foreground">
            Create Sales Order
          </h2>
          <p className="text-xs text-muted-foreground">
            Book a new order for a customer
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconShoppingCart size={15} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-sm text-foreground">
                Order Details
              </h3>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Customer *
                </Label>
                <Select value={customerId} onValueChange={setCustomerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {customers?.length > 0 ? (
                      customers.map((c: Customer) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.shopName}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground text-center ">
                        <span>No customers found</span>
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Order Date
                </Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Salesman
                </Label>
                <Select value={salesmanId} onValueChange={setSalesmanId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salesman" />
                  </SelectTrigger>
                  <SelectContent>
                    {salesmen?.length > 0 ? (
                      salesmen.map((s: Employee) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.fullName}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground text-center ">
                        <span>No salesmen found</span>
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </Label>
                <Select
                  value={status}
                  onValueChange={(val) => setStatus(val as SaleOrderStatus)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["PENDING", "PACKED", "DISPATCHED", "DELIVERED"].map(
                      (s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {customer && (
              <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border text-xs text-muted-foreground grid grid-cols-2 sm:grid-cols-4 gap-2">
                <span>
                  <strong>Type:</strong> {customer.type}
                </span>
                <span>
                  <strong>Owner:</strong> {customer.ownerName}
                </span>
                <span>
                  <strong>Mobile:</strong> {customer.mobile}
                </span>
                <span>
                  <strong>Credit:</strong> ₹{customer.creditLimit}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Line Items */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pt-5 px-6 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-sm text-foreground">
                Order Items
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
                No items added. Click "Add Item" to start.
              </div>
            ) : (
              <div className="space-y-3">
                {/* Header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide pb-1 border-b border-border">
                  <span>Product</span>
                  <span>Qty</span>
                  <span>Price (₹)</span>
                  <span>GST %</span>
                  <span>Total (₹)</span>
                  <span></span>
                </div>
                {items.map((line, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-3 items-center"
                  >
                    <Select
                      value={line.productId}
                      onValueChange={(v) => updateLine(i, "productId", v)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent className="max-h-52">
                        {products?.length > 0 ? (
                          products.map((p: ProductType) => (
                            <SelectItem key={p.id} value={p.id}>
                              {p.productName}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground text-center ">
                            <span>No products found</span>
                          </div>
                        )}
                      </SelectContent>
                    </Select>
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
                      value={line.price}
                      onChange={(e) =>
                        updateLine(i, "price", Number(e.target.value))
                      }
                      className="h-8 text-xs"
                    />
                    <Input
                      value={`${line.gst}%`}
                      readOnly
                      className="h-8 text-xs bg-muted"
                    />
                    <span className="font-semibold text-sm">
                      ₹{line.total.toFixed(0)}
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
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST</span>
                <span>₹{gstTotal.toLocaleString("en-IN")}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-heading font-bold">
                <span>Grand Total</span>
                <span className="text-primary">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/orders")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!customerId || items.length === 0 || isPending}
            className="px-8"
          >
            {isPending ? <ButtonLoader text="Saving..." /> : "Save Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}
