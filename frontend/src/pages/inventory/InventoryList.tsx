import { useState } from "react";
import { useAppStore } from "../../store/appStore";
import { useToast } from "../../hooks/use-toast";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import {
  IconBuildingWarehouse,
  IconAlertTriangle,
  IconPlus,
  IconSearch,
  IconAdjustments,
  IconPackage,
  IconTrash,
  IconCheck,
} from "@tabler/icons-react";

const statusBadge: Record<string, string> = {
  Adequate: "bg-emerald-100 text-emerald-700",
  Low: "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

const typeBadge: Record<string, string> = {
  "Raw Material": "bg-blue-100 text-blue-700",
  "Packaging Material": "bg-violet-100 text-violet-700",
  "Finished Goods": "bg-emerald-100 text-emerald-700",
};

function computeStatus(stock: number, reorder: number): string {
  if (stock === 0) return "Out of Stock";
  if (stock <= reorder) return "Low";
  return "Adequate";
}

function StockProgress({
  current,
  reorder,
}: {
  current: number;
  reorder: number;
}) {
  const max = reorder * 4;
  const pct = Math.min(100, (current / max) * 100);
  const color =
    current === 0
      ? "bg-red-500"
      : current <= reorder
        ? "bg-amber-500"
        : "bg-emerald-500";
  return (
    <div className="space-y-0.5">
      <div className="text-xs font-medium text-foreground">
        {current.toLocaleString("en-IN")}
      </div>
      <div className="w-28 h-1.5 bg-muted rounded-full">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {hint && <p className="text-[10px] text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

export default function InventoryList() {
  const { inventory, addInventoryItem, updateInventoryItem } = useAppStore();
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjustItem, setAdjustItem] = useState<(typeof inventory)[0] | null>(
    null,
  );
  const [adjustQty, setAdjustQty] = useState("");
  const [adjustType, setAdjustType] = useState("add");
  const [adjustReason, setAdjustReason] = useState("");

  const [newItem, setNewItem] = useState({
    type: "Raw Material",
    name: "",
    unit: "Kg",
    currentStock: "",
    reorderLevel: "",
    purchasePrice: "",
    supplier: "",
    lastPurchaseDate: new Date().toISOString().slice(0, 10),
    location: "",
    batchNo: "",
    notes: "",
  });

  const lowItems = inventory.filter((i) => i.status === "Low");
  const outItems = inventory.filter((i) => i.status === "Out of Stock");
  const totalValue = inventory
    .filter((i) => i.type === "Finished Goods")
    .reduce((s, i) => s + i.currentStock * i.purchasePrice, 0);

  const filterItems = (type: string) => {
    return inventory.filter((i) => {
      const matchType = type === "all" || i.type === type;
      const matchSearch =
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.id.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  };

  const handleAddItem = () => {
    const stock = Number(newItem.currentStock) || 0;
    const reorder = Number(newItem.reorderLevel) || 0;
    const prefix =
      newItem.type === "Raw Material"
        ? "RM"
        : newItem.type === "Packaging Material"
          ? "PM"
          : "FG";
    const existingNums = inventory
      .filter((i) => i.id.startsWith(prefix))
      .map((i) => parseInt(i.id.slice(prefix.length), 10))
      .filter((n) => !isNaN(n));
    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1;
    const id = `${prefix}${String(nextNum).padStart(3, "0")}`;
    const item: (typeof inventory)[0] = {
      id,
      type: newItem.type as any,
      name: newItem.name.trim(),
      unit: newItem.unit,
      currentStock: stock,
      reorderLevel: reorder,
      lastPurchaseDate: newItem.lastPurchaseDate,
      purchasePrice: Number(newItem.purchasePrice) || 0,
      supplier: newItem.supplier.trim() || "-",
      status: computeStatus(stock, reorder) as any,
    };
    addInventoryItem(item);
    toast({
      title: "Item added",
      description: `${item.name} (${item.id}) added to inventory.`,
    });
    setAddOpen(false);
    setNewItem({
      type: "Raw Material",
      name: "",
      unit: "Kg",
      currentStock: "",
      reorderLevel: "",
      purchasePrice: "",
      supplier: "",
      lastPurchaseDate: new Date().toISOString().slice(0, 10),
      location: "",
      batchNo: "",
      notes: "",
    });
  };

  const handleAdjustStock = () => {
    if (!adjustItem) return;
    const qty = Number(adjustQty) || 0;
    const newStock =
      adjustType === "add"
        ? adjustItem.currentStock + qty
        : Math.max(0, adjustItem.currentStock - qty);
    updateInventoryItem(adjustItem.id, {
      currentStock: newStock,
      status: computeStatus(newStock, adjustItem.reorderLevel) as any,
    });
    toast({
      title: "Stock adjusted",
      description: `${adjustItem.name}: ${adjustType === "add" ? "+" : "-"}${qty} ${adjustItem.unit}. New stock: ${newStock.toLocaleString("en-IN")} ${adjustItem.unit}.`,
    });
    setAdjustOpen(false);
    setAdjustQty("");
    setAdjustReason("");
  };

  function InventoryTable({ items }: { items: typeof inventory }) {
    return (
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {[
                "Item ID",
                "Type",
                "Name",
                "Unit",
                "Current Stock",
                "Reorder Level",
                "Status",
                "Last Purchase",
                "Supplier",
                "Price",
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
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-10 text-muted-foreground"
                >
                  No items found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow
                  key={item.id}
                  className={`hover:bg-muted/30 ${item.status === "Low" ? "bg-amber-50/30" : ""} ${item.status === "Out of Stock" ? "bg-red-50/30" : ""}`}
                >
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeBadge[item.type] || "bg-gray-100 text-gray-600"}`}
                    >
                      {item.type === "Finished Goods"
                        ? "FG"
                        : item.type === "Raw Material"
                          ? "RM"
                          : "PM"}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.unit}
                  </TableCell>
                  <TableCell>
                    <StockProgress
                      current={item.currentStock}
                      reorder={item.reorderLevel}
                    />
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.reorderLevel.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[item.status] || "bg-gray-100 text-gray-600"}`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.lastPurchaseDate}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {item.supplier}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    ₹{item.purchasePrice}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs gap-1"
                      onClick={() => {
                        setAdjustItem(item);
                        setAdjustOpen(true);
                        setAdjustType("add");
                        setAdjustQty("");
                        setAdjustReason("");
                      }}
                    >
                      <IconAdjustments size={12} /> Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  const addValid =
    newItem.name.trim() && newItem.currentStock && newItem.reorderLevel;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Total SKUs",
            value: inventory.length,
            bg: "bg-violet-50",
            color: "text-violet-600",
            icon: IconPackage,
          },
          {
            label: "Low Stock Items",
            value: lowItems.length,
            bg: "bg-amber-50",
            color: "text-amber-600",
            icon: IconAlertTriangle,
          },
          {
            label: "Out of Stock",
            value: outItems.length,
            bg: "bg-red-50",
            color: "text-red-600",
            icon: IconAlertTriangle,
          },
          {
            label: "FG Value",
            value: `₹${(totalValue / 1000).toFixed(0)}k`,
            bg: "bg-emerald-50",
            color: "text-emerald-600",
            icon: IconBuildingWarehouse,
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

      {/* Low Stock Alert Banner */}
      {lowItems.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
          <IconAlertTriangle
            size={18}
            className="text-amber-600 flex-shrink-0"
          />
          <p className="text-sm font-medium text-amber-800">
            {lowItems.length} item{lowItems.length > 1 ? "s" : ""} below reorder
            level: {lowItems.map((i) => i.name).join(", ")}
          </p>
        </div>
      )}

      {/* Search + Add */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
          <IconPlus size={15} /> Add Item
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="bg-muted/60 p-1 gap-1">
          <TabsTrigger value="all" className="text-xs">
            All Items
          </TabsTrigger>
          <TabsTrigger value="Raw Material" className="text-xs">
            Raw Material
          </TabsTrigger>
          <TabsTrigger value="Packaging Material" className="text-xs">
            Packaging
          </TabsTrigger>
          <TabsTrigger value="Finished Goods" className="text-xs">
            Finished Goods
          </TabsTrigger>
        </TabsList>
        {["all", "Raw Material", "Packaging Material", "Finished Goods"].map(
          (tab) => (
            <TabsContent key={tab} value={tab} className="mt-4">
              <InventoryTable items={filterItems(tab)} />
            </TabsContent>
          ),
        )}
      </Tabs>

      {/* Add Item Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconPackage size={16} className="text-primary" />
              </div>
              Add Inventory Item
            </DialogTitle>
            <DialogDescription>
              Enter the details for the new inventory item. Fields marked * are
              required.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="space-y-5 py-1">
            {/* Item Identity */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Item Identity
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Item Type" required>
                  <Select
                    value={newItem.type}
                    onValueChange={(v) => setNewItem({ ...newItem, type: v })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Raw Material">Raw Material</SelectItem>
                      <SelectItem value="Packaging Material">
                        Packaging Material
                      </SelectItem>
                      <SelectItem value="Finished Goods">
                        Finished Goods
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Item Name" required>
                  <Input
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    placeholder="e.g. Turmeric Root (Dried)"
                    className="h-9"
                  />
                </Field>
                <Field label="Unit of Measure" required>
                  <Select
                    value={newItem.unit}
                    onValueChange={(v) => setNewItem({ ...newItem, unit: v })}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Kg",
                        "Pcs",
                        "Box",
                        "Carton",
                        "Litre",
                        "Pack",
                        "Gram",
                      ].map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Batch / Lot Number" hint="For traceability">
                  <Input
                    value={newItem.batchNo}
                    onChange={(e) =>
                      setNewItem({ ...newItem, batchNo: e.target.value })
                    }
                    placeholder="B2024001"
                    className="h-9"
                  />
                </Field>
              </div>
            </div>

            {/* Stock Levels */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Stock Levels
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Current Stock" required>
                  <Input
                    type="number"
                    min={0}
                    value={newItem.currentStock}
                    onChange={(e) =>
                      setNewItem({ ...newItem, currentStock: e.target.value })
                    }
                    placeholder="0"
                    className="h-9"
                  />
                </Field>
                <Field
                  label="Reorder Level"
                  required
                  hint="Minimum stock before alert"
                >
                  <Input
                    type="number"
                    min={0}
                    value={newItem.reorderLevel}
                    onChange={(e) =>
                      setNewItem({ ...newItem, reorderLevel: e.target.value })
                    }
                    placeholder="0"
                    className="h-9"
                  />
                </Field>
                <Field label="Warehouse / Bin Location" hint="e.g. WH-01-A-03">
                  <Input
                    value={newItem.location}
                    onChange={(e) =>
                      setNewItem({ ...newItem, location: e.target.value })
                    }
                    placeholder="WH-01-A-03"
                    className="h-9"
                  />
                </Field>
              </div>
            </div>

            {/* Purchase & Supplier */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Purchase & Supplier
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Purchase Price (₹)" required>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={newItem.purchasePrice}
                    onChange={(e) =>
                      setNewItem({ ...newItem, purchasePrice: e.target.value })
                    }
                    placeholder="0.00"
                    className="h-9"
                  />
                </Field>
                <Field label="Supplier" hint="Supplier name or ID">
                  <Input
                    value={newItem.supplier}
                    onChange={(e) =>
                      setNewItem({ ...newItem, supplier: e.target.value })
                    }
                    placeholder="Kerala Spice Farm"
                    className="h-9"
                  />
                </Field>
                <Field label="Last Purchase Date">
                  <Input
                    type="date"
                    value={newItem.lastPurchaseDate}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        lastPurchaseDate: e.target.value,
                      })
                    }
                    className="h-9"
                  />
                </Field>
              </div>
            </div>

            {/* Notes */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Additional Notes
              </h4>
              <Field label="Notes" hint="Any extra info about this item">
                <Textarea
                  value={newItem.notes}
                  onChange={(e) =>
                    setNewItem({ ...newItem, notes: e.target.value })
                  }
                  placeholder="Storage conditions, handling instructions, etc."
                  rows={2}
                  className="text-sm resize-none"
                />
              </Field>
            </div>
          </div>
          {/* Live preview of computed values */}
          {newItem.currentStock && newItem.reorderLevel && (
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">Stock Value</p>
                <p className="font-heading font-bold text-sm text-foreground mt-0.5">
                  ₹
                  {(
                    (Number(newItem.currentStock) || 0) *
                    (Number(newItem.purchasePrice) || 0)
                  ).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">Auto Status</p>
                <span
                  className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[computeStatus(Number(newItem.currentStock) || 0, Number(newItem.reorderLevel) || 0)]}`}
                >
                  {computeStatus(
                    Number(newItem.currentStock) || 0,
                    Number(newItem.reorderLevel) || 0,
                  )}
                </span>
              </div>
              <div className="p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground">Generated ID</p>
                <p className="font-mono font-bold text-sm text-foreground mt-0.5">
                  {(() => {
                    const prefix =
                      newItem.type === "Raw Material"
                        ? "RM"
                        : newItem.type === "Packaging Material"
                          ? "PM"
                          : "FG";
                    const existingNums = inventory
                      .filter((i) => i.id.startsWith(prefix))
                      .map((i) => parseInt(i.id.slice(prefix.length), 10))
                      .filter((n) => !isNaN(n));
                    const nextNum =
                      existingNums.length > 0
                        ? Math.max(...existingNums) + 1
                        : 1;
                    return `${prefix}${String(nextNum).padStart(3, "0")}`;
                  })()}
                </p>
              </div>
            </div>
          )}
          <Separator />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddItem}
              disabled={!addValid}
              className="gap-1.5"
            >
              <IconCheck size={16} /> Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Stock Dialog */}
      <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconAdjustments size={16} className="text-primary" />
              </div>
              Adjust Stock — {adjustItem?.name}
            </DialogTitle>
            <DialogDescription>
              Add or remove stock for this item.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="space-y-4 py-1">
            <div className="p-3 rounded-lg bg-muted/50 text-sm flex items-center justify-between">
              <span className="text-muted-foreground">Current Stock</span>
              <strong>
                {adjustItem?.currentStock.toLocaleString("en-IN")}{" "}
                {adjustItem?.unit}
              </strong>
            </div>
            <Field label="Adjustment Type" required>
              <Select value={adjustType} onValueChange={setAdjustType}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Stock (+)</SelectItem>
                  <SelectItem value="remove">Remove Stock (-)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label={`Quantity (${adjustItem?.unit || ""})`} required>
              <Input
                type="number"
                min={1}
                value={adjustQty}
                onChange={(e) => setAdjustQty(e.target.value)}
                placeholder="Enter quantity"
                className="h-9"
              />
            </Field>
            <Field
              label="Reason"
              hint="e.g. New shipment, Damaged stock, Quality rejection"
            >
              <Input
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                placeholder="Reason for adjustment"
                className="h-9"
              />
            </Field>
            {adjustType === "remove" && adjustItem && adjustQty && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <IconAlertTriangle size={14} className="flex-shrink-0" />
                New stock will be{" "}
                {Math.max(
                  0,
                  adjustItem.currentStock - (Number(adjustQty) || 0),
                ).toLocaleString("en-IN")}{" "}
                {adjustItem.unit}
              </div>
            )}
            {adjustType === "add" && adjustItem && adjustQty && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
                <IconCheck size={14} className="flex-shrink-0" />
                New stock will be{" "}
                {(
                  adjustItem.currentStock + (Number(adjustQty) || 0)
                ).toLocaleString("en-IN")}{" "}
                {adjustItem.unit}
              </div>
            )}
          </div>
          <Separator />
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setAdjustOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAdjustStock}
              disabled={!adjustQty}
              className="gap-1.5"
            >
              <IconCheck size={16} /> Apply Adjustment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
