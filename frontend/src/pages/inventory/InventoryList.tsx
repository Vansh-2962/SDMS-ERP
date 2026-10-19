import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  IconAdjustments,
  IconAlertTriangle,
  IconBuildingWarehouse,
  IconCheck,
  IconPackage,
  IconPencil,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import {
  useAdjustProductStock,
  useAdjustStockroomItem,
  useCreateProductStock,
  useCreateStockroomItem,
  useDeleteStockroomItem,
  useGetProductStocks,
  useGetStockroomItems,
  useUpdateStockroomItem,
} from "@/features/inventory/hooks/useInventory";
import type {
  InventoryAdjustmentDirection,
  ProductStockRow,
  StockroomItem,
  StockroomItemInput,
  StockroomItemType,
  UpdateStockroomItemInput,
} from "@/features/inventory/types/inventory.types";

const typeNames: Record<StockroomItemType, string> = {
  RAW_MATERIAL: "Raw Material",
  PACKAGING_MATERIAL: "Packaging Material",
  OTHER: "Other",
};

const typeBadge: Record<StockroomItemType, string> = {
  RAW_MATERIAL: "bg-blue-100 text-blue-700",
  PACKAGING_MATERIAL: "bg-violet-100 text-violet-700",
  OTHER: "bg-gray-100 text-gray-700",
};

const statusClass: Record<string, string> = {
  Adequate: "bg-emerald-100 text-emerald-700",
  Low: "bg-amber-100 text-amber-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

const emptyForm = {
  type: "RAW_MATERIAL" as StockroomItemType,
  name: "",
  unit: "Kg",
  currentStock: "",
  reorderLevel: "",
  purchasePrice: "",
  supplier: "",
  lastPurchaseDate: "",
  warehouseLocation: "",
  batchNo: "",
  notes: "",
};

function stockStatus(stock: number, reorder: number) {
  if (stock <= 0) return "Out of Stock";
  if (stock <= reorder) return "Low";
  return "Adequate";
}

function displayDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("en-IN") : "—";
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function StockProgress({
  current,
  reorder,
  unit,
}: {
  current: number;
  reorder: number;
  unit: string;
}) {
  const max = Math.max(reorder * 4, current, 1);
  const pct = Math.min(100, (current / max) * 100);
  const status = stockStatus(current, reorder);
  const color =
    status === "Out of Stock"
      ? "bg-red-500"
      : status === "Low"
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div className="space-y-1">
      <div className="text-xs font-medium text-foreground">
        {current.toLocaleString("en-IN")} {unit}
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

export default function InventoryList() {
  const {
    data: stockroomResponse,
    isLoading: itemsLoading,
    isError: itemsError,
  } = useGetStockroomItems();
  const {
    data: productStockResponse,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductStocks();
  const { mutate: createItem, isPending: isCreating } =
    useCreateStockroomItem();
  const { mutate: updateItem, isPending: isUpdating } =
    useUpdateStockroomItem();
  const { mutate: deleteItem } = useDeleteStockroomItem();
  const { mutate: adjustItem, isPending: isAdjustingItem } =
    useAdjustStockroomItem();
  const { mutate: createProductStock, isPending: isCreatingProductStock } =
    useCreateProductStock();
  const { mutate: adjustProductStock, isPending: isAdjustingProduct } =
    useAdjustProductStock();

  const stockroomItems = stockroomResponse?.data ?? [];
  const productStockRows = productStockResponse?.data ?? [];

  const [search, setSearch] = useState("");
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StockroomItem | null>(null);
  const [itemForm, setItemForm] = useState(emptyForm);
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [adjustingItem, setAdjustingItem] = useState<StockroomItem | null>(
    null,
  );
  const [adjustingProduct, setAdjustingProduct] =
    useState<ProductStockRow | null>(null);
  const [adjustDirection, setAdjustDirection] =
    useState<InventoryAdjustmentDirection>("ADD");
  const [adjustQuantity, setAdjustQuantity] = useState("");
  const [adjustReason, setAdjustReason] = useState("");
  const [newProductLocation, setNewProductLocation] = useState("");
  const [newProductStock, setNewProductStock] = useState("");
  const [newProductReorder, setNewProductReorder] = useState("");

  const lowItemCount =
    stockroomItems.filter(
      (item) => stockStatus(item.currentStock, item.reorderLevel) === "Low",
    ).length +
    productStockRows.filter(
      (row) => row.currentStock > 0 && row.currentStock <= row.reorderLevel,
    ).length;
  const outItemCount =
    stockroomItems.filter((item) => item.currentStock <= 0).length +
    productStockRows.filter((row) => row.currentStock <= 0).length;
  const stockroomValue = stockroomItems.reduce(
    (sum, item) => sum + item.currentStock * item.purchasePrice,
    0,
  );

  const searchText = search.trim().toLowerCase();
  const filteredItems = (type?: StockroomItemType) =>
    stockroomItems.filter((item) => {
      const typeMatches = type === undefined || item.type === type;
      const searchMatches =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        item.id.toLowerCase().includes(searchText) ||
        (item.supplier ?? "").toLowerCase().includes(searchText);
      return typeMatches && searchMatches;
    });
  const filteredProductStocks = productStockRows.filter((row) => {
    return (
      !searchText ||
      row.name.toLowerCase().includes(searchText) ||
      row.code.toLowerCase().includes(searchText) ||
      (row.warehouseLocation ?? "").toLowerCase().includes(searchText)
    );
  });

  const openNewItem = () => {
    setEditingItem(null);
    setItemForm(emptyForm);
    setItemDialogOpen(true);
  };

  const openEditItem = (item: StockroomItem) => {
    setEditingItem(item);
    setItemForm({
      type: item.type,
      name: item.name,
      unit: item.unit,
      currentStock: String(item.currentStock),
      reorderLevel: String(item.reorderLevel),
      purchasePrice: String(item.purchasePrice),
      supplier: item.supplier ?? "",
      lastPurchaseDate: item.lastPurchaseDate?.slice(0, 10) ?? "",
      warehouseLocation: item.warehouseLocation ?? "",
      batchNo: item.batchNo ?? "",
      notes: item.notes ?? "",
    });
    setItemDialogOpen(true);
  };

  const handleSaveItem = () => {
    const payload: StockroomItemInput = {
      type: itemForm.type,
      name: itemForm.name.trim(),
      unit: itemForm.unit.trim(),
      currentStock: Number(itemForm.currentStock),
      reorderLevel: Number(itemForm.reorderLevel),
      purchasePrice: Number(itemForm.purchasePrice),
      ...(itemForm.supplier.trim() && { supplier: itemForm.supplier.trim() }),
      ...(itemForm.lastPurchaseDate && {
        lastPurchaseDate: itemForm.lastPurchaseDate,
      }),
      ...(itemForm.warehouseLocation.trim() && {
        warehouseLocation: itemForm.warehouseLocation.trim(),
      }),
      ...(itemForm.batchNo.trim() && { batchNo: itemForm.batchNo.trim() }),
      ...(itemForm.notes.trim() && { notes: itemForm.notes.trim() }),
    };

    if (
      !payload.name ||
      !payload.unit ||
      !Number.isFinite(payload.currentStock) ||
      payload.currentStock < 0 ||
      !Number.isFinite(payload.reorderLevel) ||
      payload.reorderLevel < 0 ||
      !Number.isFinite(payload.purchasePrice) ||
      payload.purchasePrice < 0
    ) {
      toast.error(
        "Complete the required fields with valid non-negative values",
      );
      return;
    }

    if (editingItem) {
      const updatePayload: UpdateStockroomItemInput = {
        type: payload.type,
        name: payload.name,
        unit: payload.unit,
        reorderLevel: payload.reorderLevel,
        purchasePrice: payload.purchasePrice,
        supplier: payload.supplier ?? null,
        lastPurchaseDate: payload.lastPurchaseDate ?? null,
        warehouseLocation: payload.warehouseLocation ?? null,
        batchNo: payload.batchNo ?? null,
        notes: payload.notes ?? null,
      };
      updateItem(
        { id: editingItem.id, ...updatePayload },
        { onSuccess: () => setItemDialogOpen(false) },
      );
    } else {
      createItem(payload, { onSuccess: () => setItemDialogOpen(false) });
    }
  };

  const openStockroomAdjustment = (item: StockroomItem) => {
    setAdjustingItem(item);
    setAdjustingProduct(null);
    setAdjustDirection("ADD");
    setAdjustQuantity("");
    setAdjustReason("");
    setAdjustDialogOpen(true);
  };

  const openProductAdjustment = (row: ProductStockRow) => {
    setAdjustingProduct(row);
    setAdjustingItem(null);
    if (!row.inventoryId) {
      setNewProductLocation("");
      setNewProductStock("");
      setNewProductReorder("");
      return;
    }
    setAdjustDirection("ADD");
    setAdjustQuantity("");
    setAdjustReason("");
    setAdjustDialogOpen(true);
  };

  const handleAdjust = () => {
    const quantity = Number(adjustQuantity);
    if (!Number.isFinite(quantity) || quantity <= 0 || !adjustReason.trim()) {
      toast.error("Enter a positive quantity and an adjustment reason");
      return;
    }
    const adjustment = {
      quantity,
      direction: adjustDirection,
      reason: adjustReason.trim(),
    };

    if (adjustingItem) {
      adjustItem(
        { id: adjustingItem.id, ...adjustment },
        { onSuccess: () => setAdjustDialogOpen(false) },
      );
    } else if (adjustingProduct?.inventoryId) {
      adjustProductStock(
        { inventoryId: adjustingProduct.inventoryId, ...adjustment },
        { onSuccess: () => setAdjustDialogOpen(false) },
      );
    }
  };

  const handleCreateProductStock = () => {
    if (!adjustingProduct) return;
    const currentStock = Number(newProductStock);
    const reorderLevel = Number(newProductReorder);
    if (
      !newProductLocation.trim() ||
      !Number.isFinite(currentStock) ||
      currentStock < 0 ||
      !Number.isFinite(reorderLevel) ||
      reorderLevel < 0
    ) {
      toast.error("Enter a location and valid stock/reorder quantities");
      return;
    }
    createProductStock(
      {
        productId: adjustingProduct.productId,
        warehouseLocation: newProductLocation.trim(),
        currentStock,
        reorderLevel,
      },
      { onSuccess: () => setAdjustDialogOpen(false) },
    );
  };

  const handleDeleteItem = (item: StockroomItem) => {
    if (window.confirm(`Remove ${item.name} from the inventory list?`)) {
      deleteItem(item.id);
    }
  };

  const isLoading = itemsLoading || productsLoading;
  const hasError = itemsError || productsError;
  const openNewProductStock = (row: ProductStockRow) => {
    setAdjustingProduct(row);
    setAdjustingItem(null);
    setNewProductLocation("");
    setNewProductStock("");
    setNewProductReorder("");
    setAdjustDialogOpen(true);
  };

  function StockroomTable({ items }: { items: StockroomItem[] }) {
    if (isLoading || hasError) {
      return (
        <div className="rounded-xl border border-border p-10 text-center text-sm text-muted-foreground">
          {isLoading
            ? "Loading inventory..."
            : "Could not load inventory. Please try again."}
        </div>
      );
    }
    return (
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {[
                "Item ID",
                "Type",
                "Name",
                "Stock",
                "Reorder",
                "Status",
                "Last Purchase",
                "Supplier / Location",
                "Price",
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
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="py-10 text-center text-muted-foreground"
                >
                  No stockroom items found.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => {
                const status = stockStatus(
                  item.currentStock,
                  item.reorderLevel,
                );
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">
                      {item.id.slice(-8).toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeBadge[item.type]}`}
                      >
                        {typeNames[item.type]}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <StockProgress
                        current={item.currentStock}
                        reorder={item.reorderLevel}
                        unit={item.unit}
                      />
                    </TableCell>
                    <TableCell>
                      {item.reorderLevel.toLocaleString("en-IN")} {item.unit}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[status]}`}
                      >
                        {status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {displayDate(item.lastPurchaseDate)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {[item.supplier, item.warehouseLocation]
                        .filter(Boolean)
                        .join(" · ") || "—"}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      ₹{item.purchasePrice.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-xs"
                          onClick={() => openStockroomAdjustment(item)}
                        >
                          <IconAdjustments size={12} /> Adjust
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          aria-label={`Edit ${item.name}`}
                          onClick={() => openEditItem(item)}
                        >
                          <IconPencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          aria-label={`Delete ${item.name}`}
                          onClick={() => handleDeleteItem(item)}
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
    );
  }

  function ProductStockTable({ rows }: { rows: ProductStockRow[] }) {
    if (isLoading || hasError) {
      return (
        <div className="rounded-xl border border-border p-10 text-center text-sm text-muted-foreground">
          {isLoading
            ? "Loading product stock..."
            : "Could not load product stock. Please try again."}
        </div>
      );
    }
    return (
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {[
                "Product Code",
                "Product",
                "Batch",
                "Warehouse",
                "Stock",
                "Reorder",
                "Status",
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
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-10 text-center text-muted-foreground"
                >
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => {
                const status = stockStatus(row.currentStock, row.reorderLevel);
                return (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono text-xs">
                      {row.code}
                    </TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {row.batchNo ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {row.warehouseLocation ?? "—"}
                    </TableCell>
                    <TableCell>
                      <StockProgress
                        current={row.currentStock}
                        reorder={row.reorderLevel}
                        unit={row.unit}
                      />
                    </TableCell>
                    <TableCell>
                      {row.reorderLevel.toLocaleString("en-IN")} {row.unit}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[status]}`}
                      >
                        {status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {row.inventoryId ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-xs"
                          onClick={() => openProductAdjustment(row)}
                        >
                          <IconAdjustments size={12} /> Adjust
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-xs"
                          onClick={() => openNewProductStock(row)}
                        >
                          <IconPlus size={12} /> Add stock row
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  const summary = [
    {
      label: "Stockroom Items",
      value: stockroomItems.length,
      bg: "bg-violet-50",
      color: "text-violet-600",
      icon: IconPackage,
    },
    {
      label: "Low Stock",
      value: lowItemCount,
      bg: "bg-amber-50",
      color: "text-amber-600",
      icon: IconAlertTriangle,
    },
    {
      label: "Out of Stock",
      value: outItemCount,
      bg: "bg-red-50",
      color: "text-red-600",
      icon: IconAlertTriangle,
    },
    {
      label: "Stockroom Value",
      value: `₹${(stockroomValue / 1000).toFixed(0)}k`,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
      icon: IconBuildingWarehouse,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.label}
              className="border border-border shadow-sm overflow-auto "
            >
              <CardContent className={`p-4 ${item.bg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                  <Icon size={22} className={item.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {lowItemCount > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <IconAlertTriangle size={18} className="shrink-0 text-amber-600" />
          <p className="text-sm font-medium text-amber-800">
            {lowItemCount} stock row{lowItemCount === 1 ? "" : "s"} below
            reorder level.
          </p>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="relative min-w-[180px] flex-1">
          <IconSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search inventory..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-9 pl-9"
          />
        </div>
        <Button className="h-9 gap-1.5" onClick={openNewItem}>
          <IconPlus size={15} /> Add Item
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-muted/60 p-1">
          <TabsTrigger value="all" className="text-xs">
            Stockroom Items
          </TabsTrigger>
          <TabsTrigger value="RAW_MATERIAL" className="text-xs">
            Raw Materials
          </TabsTrigger>
          <TabsTrigger value="PACKAGING_MATERIAL" className="text-xs">
            Packaging
          </TabsTrigger>
          <TabsTrigger value="OTHER" className="text-xs">
            Other
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xs">
            Product Stock
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <StockroomTable items={filteredItems()} />
        </TabsContent>
        <TabsContent value="RAW_MATERIAL" className="mt-4">
          <StockroomTable items={filteredItems("RAW_MATERIAL")} />
        </TabsContent>
        <TabsContent value="PACKAGING_MATERIAL" className="mt-4">
          <StockroomTable items={filteredItems("PACKAGING_MATERIAL")} />
        </TabsContent>
        <TabsContent value="OTHER" className="mt-4">
          <StockroomTable items={filteredItems("OTHER")} />
        </TabsContent>
        <TabsContent value="products" className="mt-4">
          <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
            Product quantities below are read from the existing product
            inventory records. Adjustments update those records directly; they
            are not copied into stockroom items.
          </div>
          <ProductStockTable rows={filteredProductStocks} />
        </TabsContent>
      </Tabs>

      <Dialog
        open={itemDialogOpen}
        onOpenChange={(open) => {
          setItemDialogOpen(open);
          if (!open) setEditingItem(null);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {editingItem ? "Edit Inventory Item" : "Add Inventory Item"}
            </DialogTitle>
            <DialogDescription>
              Stockroom items are separate from product inventory.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="grid grid-cols-1 gap-4 py-1 sm:grid-cols-2">
            <Field label="Item Type">
              <Select
                value={itemForm.type}
                onValueChange={(value) =>
                  setItemForm({
                    ...itemForm,
                    type: value as StockroomItemType,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RAW_MATERIAL">Raw Material</SelectItem>
                  <SelectItem value="PACKAGING_MATERIAL">
                    Packaging Material
                  </SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Item Name">
              <Input
                value={itemForm.name}
                onChange={(event) =>
                  setItemForm({ ...itemForm, name: event.target.value })
                }
                placeholder="e.g. Turmeric Root"
              />
            </Field>
            <Field label="Unit">
              <Input
                value={itemForm.unit}
                onChange={(event) =>
                  setItemForm({ ...itemForm, unit: event.target.value })
                }
                placeholder="Kg, Pcs, Litre..."
              />
            </Field>
            <Field label="Current Stock">
              <Input
                type="number"
                min="0"
                step="0.001"
                value={itemForm.currentStock}
                disabled={Boolean(editingItem)}
                onChange={(event) =>
                  setItemForm({ ...itemForm, currentStock: event.target.value })
                }
              />
            </Field>
            <Field label="Reorder Level">
              <Input
                type="number"
                min="0"
                step="0.001"
                value={itemForm.reorderLevel}
                onChange={(event) =>
                  setItemForm({ ...itemForm, reorderLevel: event.target.value })
                }
              />
            </Field>
            <Field label="Purchase Price (₹)">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={itemForm.purchasePrice}
                onChange={(event) =>
                  setItemForm({
                    ...itemForm,
                    purchasePrice: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Supplier">
              <Input
                value={itemForm.supplier}
                onChange={(event) =>
                  setItemForm({ ...itemForm, supplier: event.target.value })
                }
              />
            </Field>
            <Field label="Last Purchase Date">
              <Input
                type="date"
                value={itemForm.lastPurchaseDate}
                onChange={(event) =>
                  setItemForm({
                    ...itemForm,
                    lastPurchaseDate: event.target.value,
                  })
                }
              />
            </Field>
            <Field label="Warehouse / Bin Location">
              <Input
                value={itemForm.warehouseLocation}
                onChange={(event) =>
                  setItemForm({
                    ...itemForm,
                    warehouseLocation: event.target.value,
                  })
                }
                placeholder="WH-01-A-03"
              />
            </Field>
            <Field label="Batch / Lot Number">
              <Input
                value={itemForm.batchNo}
                onChange={(event) =>
                  setItemForm({ ...itemForm, batchNo: event.target.value })
                }
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <Textarea
                  value={itemForm.notes}
                  onChange={(event) =>
                    setItemForm({ ...itemForm, notes: event.target.value })
                  }
                />
              </Field>
            </div>
          </div>
          <Separator />
          <DialogFooter>
            <Button variant="outline" onClick={() => setItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveItem}
              disabled={isCreating || isUpdating}
            >
              <IconCheck size={15} className="mr-1" />
              {isCreating || isUpdating
                ? "Saving..."
                : editingItem
                  ? "Save Changes"
                  : "Add Item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {adjustingProduct
                ? `Product Stock — ${adjustingProduct.name}`
                : `Adjust Stock — ${adjustingItem?.name}`}
            </DialogTitle>
            <DialogDescription>
              Each stock change is recorded with its reason.
            </DialogDescription>
          </DialogHeader>
          <Separator />
          {adjustingProduct && !adjustingProduct.inventoryId ? (
            <div className="space-y-4 py-1">
              <Field label="Warehouse / Bin Location">
                <Input
                  value={newProductLocation}
                  onChange={(event) =>
                    setNewProductLocation(event.target.value)
                  }
                />
              </Field>
              <Field label={`Opening Stock (${adjustingProduct.unit})`}>
                <Input
                  type="number"
                  min="0"
                  step="0.001"
                  value={newProductStock}
                  onChange={(event) => setNewProductStock(event.target.value)}
                />
              </Field>
              <Field label={`Reorder Level (${adjustingProduct.unit})`}>
                <Input
                  type="number"
                  min="0"
                  step="0.001"
                  value={newProductReorder}
                  onChange={(event) => setNewProductReorder(event.target.value)}
                />
              </Field>
              <p className="text-xs text-muted-foreground">
                This creates a row in the product's existing inventory table.
              </p>
            </div>
          ) : (
            <div className="space-y-4 py-1">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm">
                <span className="text-muted-foreground">Current stock</span>
                <strong>
                  {(
                    adjustingProduct?.currentStock ??
                    adjustingItem?.currentStock ??
                    0
                  ).toLocaleString("en-IN")}{" "}
                  {adjustingProduct?.unit ?? adjustingItem?.unit}
                </strong>
              </div>
              <Field label="Adjustment Type">
                <Select
                  value={adjustDirection}
                  onValueChange={(value) =>
                    setAdjustDirection(value as InventoryAdjustmentDirection)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADD">Add Stock (+)</SelectItem>
                    <SelectItem value="REMOVE">Remove Stock (-)</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field
                label={`Quantity (${adjustingProduct?.unit ?? adjustingItem?.unit ?? ""})`}
              >
                <Input
                  type="number"
                  min="0.001"
                  step="0.001"
                  value={adjustQuantity}
                  onChange={(event) => setAdjustQuantity(event.target.value)}
                />
              </Field>
              <Field label="Reason">
                <Input
                  value={adjustReason}
                  onChange={(event) => setAdjustReason(event.target.value)}
                  placeholder="Shipment, damage, count correction..."
                />
              </Field>
            </div>
          )}
          <Separator />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAdjustDialogOpen(false)}
            >
              Cancel
            </Button>
            {adjustingProduct && !adjustingProduct.inventoryId ? (
              <Button
                onClick={handleCreateProductStock}
                disabled={isCreatingProductStock}
              >
                {isCreatingProductStock ? "Saving..." : "Create Stock Row"}
              </Button>
            ) : (
              <Button
                onClick={handleAdjust}
                disabled={isAdjustingItem || isAdjustingProduct}
              >
                <IconCheck size={15} className="mr-1" />
                {isAdjustingItem || isAdjustingProduct
                  ? "Saving..."
                  : "Apply Adjustment"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
