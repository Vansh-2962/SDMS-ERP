import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/appStore";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import {
  IconPackage,
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconAlertTriangle,
  IconBarcode,
} from "@tabler/icons-react";
import { useGetAllProducts } from "@/features/product/hooks/useGetAllProducts";
import { ProductType } from "@/features/product/types/product.types";

const categoryColors: Record<string, string> = {
  "Powder Spices": "bg-amber-100 text-amber-700",
  "Whole Spices": "bg-emerald-100 text-emerald-700",
  "Blended Spices": "bg-violet-100 text-violet-700",
  Seeds: "bg-blue-100 text-blue-700",
  Extracts: "bg-rose-100 text-rose-700",
};

function StockBar({ current, reorder }: { current: number; reorder: number }) {
  const pct = Math.min(100, (current / (reorder * 3)) * 100);
  const color =
    current === 0
      ? "bg-red-500"
      : current <= reorder
        ? "bg-amber-500"
        : "bg-emerald-500";
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span
          className={
            current <= reorder
              ? "text-amber-700 font-medium"
              : "text-foreground"
          }
        >
          {current.toLocaleString("en-IN")}
        </span>
        {current <= reorder && (
          <IconAlertTriangle size={11} className="text-amber-500" />
        )}
      </div>
      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ProductList() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useAppStore();
  const { data } = useGetAllProducts();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const allProducts = data?.data ?? [];

  const summaryCards = [
    {
      label: "Total Products",
      value: allProducts.length,
      icon: IconPackage,
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
    {
      label: "Low Stock",
      value: 0,
      icon: IconAlertTriangle,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Out of Stock",
      value: 0,
      icon: IconAlertTriangle,
      bg: "bg-red-50",
      color: "text-red-600",
    },
    {
      label: "Inventory Value",
      value: `₹ 0k`,
      icon: IconBarcode,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="border border-border shadow-sm overflow-hidden"
            >
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search product, code, barcode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-44 h-9">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {[
              "All",
              "Powder Spices",
              "Whole Spices",
              "Blended Spices",
              "Seeds",
              "Extracts",
            ].map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() => navigate("/products/new")}
          className="h-9 gap-1.5"
        >
          <IconPlus size={15} />
          Add Product
        </Button>
      </div>

      <Card className="border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {[
                  "Code",
                  "Product Name",
                  "Category",
                  "Brand",
                  "HSN",
                  "GST%",
                  "MRP",
                  "Dist. Price",
                  "Stock",
                  "Batch",
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
              {allProducts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="text-center py-12 text-muted-foreground"
                  >
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                allProducts.map((p: ProductType) => (
                  <TableRow key={p.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <p className="font-mono text-xs font-medium text-foreground">
                          {p.code}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {p.barcode}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-sm text-foreground">
                        {p.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {p.unit} · {p.netWeight}
                      </p>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[p.category] || "bg-gray-100 text-gray-600"}`}
                      >
                        {p.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {p.brand}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{p.hsn}</TableCell>
                    <TableCell className="text-xs font-medium">
                      {p.gst}%
                    </TableCell>
                    <TableCell className="font-medium text-sm">
                      ₹{p.mrp}
                    </TableCell>
                    <TableCell className="font-medium text-sm text-primary">
                      ₹{p.distPrice}
                    </TableCell>
                    <TableCell>
                      <StockBar current={p.stock} reorder={0} />
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {p.batchNo}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-primary"
                          onClick={() => navigate(`/products/${p.id}/edit`)}
                        >
                          <IconEdit size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => setDeleteId(p.id)}
                        >
                          <IconTrash size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-2 border-t border-border bg-muted/20 text-xs text-muted-foreground">
          Showing {allProducts.length} of {allProducts.length} products
        </div>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this product from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteId) deleteProduct(deleteId);
                setDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
