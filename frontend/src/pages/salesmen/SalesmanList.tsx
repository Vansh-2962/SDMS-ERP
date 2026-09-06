import { useState } from "react";
import { useAppStore } from "../../store/appStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
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
  DialogDescription,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";

import { Separator } from "../../components/ui/separator";
import { Checkbox } from "../../components/ui/checkbox";
import {
  IconUserCheck,
  IconMapPin,
  IconShoppingCart,
  IconCurrencyRupee,
  IconBuildingStore,
  IconPlus,
  IconEye,
  IconCircleFilled,
  IconCalendarEvent,
  IconClipboardList,
  IconCamera,
  IconUsers,
  IconPackage,
  IconCheck,
  IconSearch,
} from "@tabler/icons-react";
import CreateEmployeeForm from "@/features/employee/component/CreateEmployeeForm";
import { useGetAllSalesman } from "@/features/employee/hooks/useGetAllSalesman";
import SalesmanActivity from "./SalesmanActivity";
import SalesmenNotFound from "./SalesmenNotFound";

export default function SalesmanList() {
  const { products, salesmanAssignments, assignInventory } = useAppStore();

  const { data, isLoading } = useGetAllSalesman();
  const salesmen = data?.data || [];

  const [selected, setSelected] = useState<(typeof salesmen)[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignSalesman, setAssignSalesman] = useState<
    (typeof salesmen)[0] | null
  >(null);
  const [assignSearch, setAssignSearch] = useState("");
  const [assignQtys, setAssignQtys] = useState<Record<string, string>>({});
  const [assignSelected, setAssignSelected] = useState<Record<string, boolean>>(
    {},
  );

  const summaryCards = [
    {
      label: "Total Salesmen",
      value: salesmen.length ?? 0,
      bg: "bg-violet-50",
      color: "text-violet-600",
      icon: IconUsers,
    },
    {
      label: "Active Today",
      value: 0,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
      icon: IconUserCheck,
    },
    {
      label: "Total Visits",
      value: 0,
      bg: "bg-blue-50",
      color: "text-blue-600",
      icon: IconBuildingStore,
    },
    {
      label: "Today's Collection",
      value: `₹ 0k`,
      bg: "bg-amber-50",
      color: "text-amber-600",
      icon: IconCurrencyRupee,
    },
  ];

  const openAssignModal = (sm: (typeof salesmen)[0]) => {
    setAssignSalesman(sm);
    setAssignOpen(true);
    setAssignSearch("");
    setAssignQtys({});
    setAssignSelected({});
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(assignSearch.toLowerCase()) ||
      p.code.toLowerCase().includes(assignSearch.toLowerCase()),
  );

  const selectedCount = Object.values(assignSelected).filter(Boolean).length;
  const totalAssignQty = Object.entries(assignSelected)
    .filter(([, checked]) => checked)
    .reduce((sum, [pid]) => {
      return sum + (Number(assignQtys[pid]) || 0);
    }, 0);

  const handleAssign = () => {
    if (!assignSalesman) return;
    const items = Object.entries(assignSelected)
      .filter(
        ([, checked]) =>
          checked &&
          Number(
            assignQtys[
              Object.entries(assignSelected).find(
                ([, c]) => c === checked,
              )?.[0] || ""
            ],
          ) > 0,
      )
      .map(([pid]) => ({ productId: pid, qty: Number(assignQtys[pid]) || 0 }))
      .filter((i) => i.qty > 0);
    if (items.length === 0) return;
    assignInventory(assignSalesman.id, items);
    setAssignOpen(false);
    setAssignQtys({});
    setAssignSelected({});
  };

  const getAssignedCount = (smId: string) => {
    const assignments = salesmanAssignments[smId] || [];
    return assignments.reduce((s, a) => s + a.qty, 0);
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
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

      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-base text-foreground">
          Field Sales Team
        </h3>
        <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
          <IconPlus size={15} /> Add Salesman
        </Button>
      </div>

      {/* Salesman Cards Grid */}
      {salesmen.length === 0 ? (
        <SalesmenNotFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {salesmen.map((sm: any) => {
            const initials = sm?.fullName
              ?.split(" ")
              .map((n: any) => n[0])
              .join("")
              .toUpperCase();
            const assigned = getAssignedCount(sm.id);
            return (
              <Card
                key={sm.id}
                className="border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-lg">
                          {initials}
                        </div>
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${sm.status === "Active" ? "bg-emerald-500" : "bg-gray-400"}`}
                        />
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm text-foreground">
                          {sm?.fullName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sm?.email}
                        </p>
                      </div>
                    </div>
                    {sm?.isActive === "Active" && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100">
                        <IconCircleFilled
                          size={7}
                          className="text-emerald-600 animate-pulse-slow"
                        />
                        <span className="text-[10px] font-semibold text-emerald-700">
                          LIVE
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                    <IconMapPin size={12} className="text-primary" />
                    <span>{sm.territory}</span>
                    <span className="text-border">·</span>
                    <span>{sm.assignedCustomers ?? 0} customers</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      {
                        label: "Visits",
                        value: sm.todayVisits ?? 0,
                        color: "text-blue-600 bg-blue-50",
                      },
                      {
                        label: "Orders",
                        value: sm.ordersBooked ?? 0,
                        color: "text-violet-600 bg-violet-50",
                      },
                      {
                        label: "Pending",
                        value: sm.pendingVisits ?? 0,
                        color:
                          sm.pendingVisits > 4
                            ? "text-red-600 bg-red-50"
                            : "text-amber-600 bg-amber-50",
                      },
                    ].map(({ label, value, color }) => (
                      <div
                        key={label}
                        className={`rounded-xl p-2 text-center ${color.split(" ")[1]}`}
                      >
                        <p
                          className={`text-xl font-heading font-bold ${color.split(" ")[0]}`}
                        >
                          {value}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">
                      Collection Today
                    </span>
                    <span className="font-semibold text-sm text-emerald-700">
                      ₹{0}
                    </span>
                  </div>

                  {assigned > 0 && (
                    <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-1.5">
                        <IconPackage size={13} className="text-primary" />
                        <span className="text-xs text-muted-foreground">
                          Assigned Stock
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-primary">
                        {assigned.toLocaleString("en-IN")} units
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>Last seen: {sm.lastSeen ?? "Never"}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs gap-1"
                      onClick={() => setSelected(sm)}
                    >
                      <IconEye size={13} /> Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs gap-1"
                      onClick={() => openAssignModal(sm)}
                    >
                      <IconPackage size={13} /> Assign
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Activity Table */}
      <SalesmanActivity salesmen={salesmen} />

      {/* Salesman Detail Dialog */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">
                {selected.fullName} — Profile
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Mobile", value: selected.mobile },
                  { label: "Email", value: selected.email },
                  { label: "Territory", value: selected.territory },
                  {
                    label: "Assigned Customers",
                    value: 0,
                  },
                  { label: "Status", value: "Active" },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground mt-0.5">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Visits Plan",
                    value: 0,
                    icon: IconCalendarEvent,
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    label: "Orders Today",
                    value: 0,
                    icon: IconClipboardList,
                    color: "text-violet-600 bg-violet-50",
                  },
                  {
                    label: "Collection",
                    value: `₹ 0k`,
                    icon: IconCurrencyRupee,
                    color: "text-emerald-600 bg-emerald-50",
                  },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div
                    key={label}
                    className={`p-3 rounded-xl ${color.split(" ")[1]} text-center`}
                  >
                    <Icon
                      size={20}
                      className={`${color.split(" ")[0]} mx-auto mb-1`}
                    />
                    <p
                      className={`text-lg font-heading font-bold ${color.split(" ")[0]}`}
                    >
                      {value}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <IconCamera size={14} /> View Photos
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <IconMapPin size={14} /> GPS Route
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <IconClipboardList size={14} /> Visit Log
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Salesman Dialog */}
      <CreateEmployeeForm addOpen={addOpen} setAddOpen={setAddOpen} />

      {/* Assign Inventory Dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <IconPackage size={16} className="text-primary" />
              </div>
              Assign Inventory — {assignSalesman?.fullName}
            </DialogTitle>
            <DialogDescription>
              Select products and enter the quantity to assign to this salesman.
            </DialogDescription>
          </DialogHeader>
          <Separator />

          {/* Search bar */}
          <div className="relative">
            <IconSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              placeholder="Search products by name or code..."
              value={assignSearch}
              onChange={(e) => setAssignSearch(e.target.value)}
              className="pl-9 h-9"
            />
          </div>

          {/* Product list */}
          <div className="flex-1 overflow-y-auto min-h-0 rounded-lg border border-border">
            <Table>
              <TableHeader className="sticky top-0">
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-10" />
                  <TableHead className="text-xs font-semibold">
                    Product
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Code</TableHead>
                  <TableHead className="text-xs font-semibold text-right">
                    Available Stock
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-right">
                    Assign Qty
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-8 text-muted-foreground text-sm"
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((p) => {
                    const isChecked = !!assignSelected[p.id];
                    const enteredQty = assignQtys[p.id] || "";
                    const stock = p.currentStock;
                    const overLimit = Number(enteredQty) > stock;
                    return (
                      <TableRow
                        key={p.id}
                        className={`hover:bg-muted/30 ${isChecked ? "bg-primary/5" : ""}`}
                      >
                        <TableCell>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(v) =>
                              setAssignSelected({
                                ...assignSelected,
                                [p.id]: !!v,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <p className="font-medium text-sm text-foreground">
                            {p.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {p.unit} · {p.weight}
                          </p>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {p.code}
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`text-sm font-medium ${stock <= p.reorderLevel ? "text-amber-600" : "text-foreground"}`}
                          >
                            {stock.toLocaleString("en-IN")}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Input
                            type="number"
                            min={0}
                            max={stock}
                            value={enteredQty}
                            disabled={!isChecked}
                            onChange={(e) =>
                              setAssignQtys({
                                ...assignQtys,
                                [p.id]: e.target.value,
                              })
                            }
                            placeholder={isChecked ? "0" : "—"}
                            className={`h-8 w-24 text-sm ${overLimit ? "border-red-400 text-red-600" : ""}`}
                          />
                          {overLimit && (
                            <p className="text-[10px] text-red-500 mt-0.5">
                              Exceeds stock
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Footer summary */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>
                <strong className="text-foreground">{selectedCount}</strong>{" "}
                product{selectedCount !== 1 ? "s" : ""} selected
              </span>
              <span>
                <strong className="text-foreground">
                  {totalAssignQty.toLocaleString("en-IN")}
                </strong>{" "}
                total units
              </span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setAssignOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAssign}
                disabled={selectedCount === 0}
                className="gap-1.5"
              >
                <IconCheck size={16} /> Assign{" "}
                {selectedCount > 0
                  ? `${selectedCount} Item${selectedCount > 1 ? "s" : ""}`
                  : ""}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
