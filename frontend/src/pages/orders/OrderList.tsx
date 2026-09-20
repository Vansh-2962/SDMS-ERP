import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  IconPlus,
  IconSearch,
  IconEye,
  IconEdit,
  IconX,
  IconLoader2,
} from "@tabler/icons-react";
import { useGetAllSaleOrders } from "@/features/saleOrder/hooks/useGetAllSaleOrders";
import { SaleOrder } from "@/features/saleOrder/types/saleOrder.type";
import { formatDate } from "@/lib/helpers";
import { generateSaleOrderCode } from "@/features/saleOrder/helper/generateOrderCode";
import ProductListSkeleton from "@/features/product/component/ProductListSkeleton";
import SaleOrderNotFound from "@/features/saleOrder/component/SaleOrderNotFound";
import { getOrderSummary } from "@/features/saleOrder/helper/getSummary";
import { useUpdateOrderStatus } from "@/features/saleOrder/hooks/useUpdateOrderStatus";
import { statusConfig } from "@/features/saleOrder/constants/statusConfig";

export default function OrderList() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllSaleOrders();
  const { mutate, isPending } = useUpdateOrderStatus();
  const salesOrders = data?.data ?? [];
  const summaryCards = getOrderSummary(salesOrders);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = salesOrders.filter((o: SaleOrder) => {
    const q = search.toLowerCase();
    const matchSearch =
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.salesman.fullName.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleCancel = (id: string) => {
    if (!id) return;
    mutate({ id, status: "CANCELLED" });
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 ">
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
            placeholder="Search order ID, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {[
              "All",
              "Pending",
              "Packed",
              "Dispatched",
              "Delivered",
              "Cancelled",
            ].map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => navigate("/orders/new")} className="h-9 gap-1.5">
          <IconPlus size={15} />
          New Order
        </Button>
      </div>

      {
        <Card className="border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {isLoading ? (
              <ProductListSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {[
                      "Order ID",
                      "Customer",
                      "Date",
                      "Items",
                      "Subtotal",
                      "GST",
                      "Total",
                      "Salesman",
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
                  {filtered.length > 0 &&
                    filtered.map((o: SaleOrder) => {
                      const sc =
                        statusConfig[o.status] || statusConfig["PENDING"];
                      const StatusIcon = sc.icon;
                      return (
                        <TableRow key={o.id} className="hover:bg-muted/30">
                          <TableCell className="font-mono text-xs font-medium text-primary">
                            {generateSaleOrderCode(o.saleOrderCode)}
                          </TableCell>
                          <TableCell className="font-medium text-sm">
                            {o.customerName}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatDate(o.createdAt)}
                          </TableCell>
                          <TableCell className="text-left text-sm font-medium">
                            {o._count.items}
                          </TableCell>
                          <TableCell className="text-sm">
                            ₹{o.subtotal}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            ₹{o.gstAmount}
                          </TableCell>
                          <TableCell className="font-semibold text-sm">
                            ₹{o.total}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {o.salesman.fullName}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}
                            >
                              <StatusIcon size={11} />
                              {o.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-primary"
                              >
                                <IconEye size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-primary"
                                onClick={() => navigate(`/orders/${o.id}/edit`)}
                              >
                                <IconEdit size={14} />
                              </Button>
                              {o.status !== "DELIVERED" && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleCancel(o.id)}
                                >
                                  {isPending ? (
                                    <IconLoader2
                                      size={14}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <IconX size={14} />
                                  )}
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            )}
            {filtered.length === 0 && !isLoading && <SaleOrderNotFound />}
          </div>
          <div className="px-4 py-2 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            Showing {filtered.length} of {salesOrders.length} orders
          </div>
        </Card>
      }
    </div>
  );
}
