import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
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
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconAlertTriangle,
  IconTrashFilled,
} from "@tabler/icons-react";
import { useGetAllProducts } from "@/features/product/hooks/useGetAllProducts";
import { ProductType } from "@/features/product/types/product.types";
import {
  getLowStockProducts,
  getOutOfStock,
} from "../../features/product/helpers/product.helper";
import { useDeleteProduct } from "@/features/product/hooks/useDeleteProduct";
import ButtonLoader from "@/components/ButtonLoader";
import ProductSummaryCards from "@/features/product/component/ProductSummaryCards";
import ProductListSkeleton from "@/features/product/component/ProductListSkeleton";

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
  const { data, isLoading } = useGetAllProducts();
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const allProducts = data?.data ?? [];
  const lowStockCount = getLowStockProducts(allProducts);
  const outOfStockCount = getOutOfStock(allProducts);

  const handleDeleteProduct = () => {
    if (!deleteId) return;
    deleteProduct(deleteId, {
      onSuccess: () => {
        setDeleteId(null);
      },
    });
  };

  return (
    <div className="space-y-5">
      <ProductSummaryCards
        totalProducts={allProducts.length}
        lowStock={lowStockCount}
        outOfStock={outOfStockCount}
        inventoryValue={0}
      />

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
          disabled={isLoading}
        >
          <IconPlus size={15} />
          Add Product
        </Button>
      </div>

      <Card className="border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <ProductListSkeleton />
          ) : (
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
                      <TableCell className="text-xs ">
                        {p.brand ? p.brand : "N/A"}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {p.hsn ? p.hsn : "N/A"}
                      </TableCell>
                      <TableCell className="text-xs font-medium">
                        {Number(p.gst) > 0 ? `${p.gst}%` : "N/A"}
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
          )}
        </div>
        <div className="px-4 py-2 border-t border-border bg-muted/20 text-xs text-muted-foreground">
          Showing {allProducts.length} of {allProducts.length} products
        </div>
      </Card>

      <AlertDialog open={!!deleteId}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this product from your catalog.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              onClick={() => setDeleteId(null)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteProduct}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <ButtonLoader text="Deleting..." />
                </>
              ) : (
                <div className="flex items-center gap-1.5">
                  <IconTrashFilled size={17} /> Delete
                </div>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
