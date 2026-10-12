import { useMemo, useState } from "react";
import { AxiosError } from "axios";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  IconBolt,
  IconBrandInstagram,
  IconCheck,
  IconClock,
  IconGasStation,
  IconHome,
  IconPackage,
  IconPlus,
  IconReceipt,
  IconSearch,
  IconTrash,
  IconTruck,
  IconUsers,
  IconX,
  IconEdit,
} from "@tabler/icons-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseFormDialog from "@/features/expenses/components/ExpenseFormDialog";
import {
  useDeleteExpense,
  useExpenses,
  useUpdateExpense,
} from "@/features/expenses/hooks/useExpenses";
import {
  expenseCategories,
  type Expense,
  type ExpenseStatus,
} from "@/features/expenses/types/expense.types";

const categoryIcons: Record<string, typeof IconReceipt> = {
  Diesel: IconGasStation,
  Salary: IconUsers,
  Courier: IconTruck,
  Rent: IconHome,
  Electricity: IconBolt,
  Packaging: IconPackage,
  Marketing: IconBrandInstagram,
};

const categoryColors: Record<string, string> = {
  Diesel: "#f59e0b",
  Salary: "#8b5cf6",
  Courier: "#3b82f6",
  Rent: "#ef4444",
  Electricity: "#f97316",
  Packaging: "#22c55e",
  Marketing: "#ec4899",
};

const statusConfig: Record<
  ExpenseStatus,
  { color: string; icon: typeof IconCheck }
> = {
  APPROVED: { color: "bg-emerald-100 text-emerald-700", icon: IconCheck },
  PENDING: { color: "bg-amber-100 text-amber-700", icon: IconClock },
  REJECTED: { color: "bg-red-100 text-red-700", icon: IconX },
};

const EMPTY_EXPENSES: Expense[] = [];
const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const dateLabel = (date: string) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(date),
  );
const errorMessage = (error: Error) =>
  error instanceof AxiosError
    ? (error.response?.data?.error?.message ?? error.message)
    : error.message;

export default function Expenses() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const expensesQuery = useExpenses();
  const updateMutation = useUpdateExpense();
  const deleteMutation = useDeleteExpense();
  const expenses = expensesQuery.data?.data ?? EMPTY_EXPENSES;
  const currentMonth = new Date();

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return expenses.filter((expense) => {
      const matchesSearch =
        expense.description.toLowerCase().includes(query) ||
        expense.category.toLowerCase().includes(query) ||
        expense.id.toLowerCase().includes(query);
      const matchesCategory =
        catFilter === "All" || expense.category === catFilter;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, catFilter]);

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const approved = expenses
    .filter((expense) => expense.status === "APPROVED")
    .reduce((sum, expense) => sum + expense.amount, 0);
  const pending = expenses
    .filter((expense) => expense.status === "PENDING")
    .reduce((sum, expense) => sum + expense.amount, 0);
  const currentMonthTotal = expenses
    .filter((expense) => {
      const date = new Date(expense.date);
      return (
        date.getFullYear() === currentMonth.getFullYear() &&
        date.getMonth() === currentMonth.getMonth()
      );
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const pieData = Object.entries(
    expenses.reduce<Record<string, number>>((totals, expense) => {
      totals[expense.category] =
        (totals[expense.category] ?? 0) + expense.amount;
      return totals;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const openCreate = () => {
    setEditingExpense(null);
    setFormOpen(true);
  };

  const openEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormOpen(true);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: "Total expenses",
            value: money(totalExpense),
            bg: "bg-violet-50",
            color: "text-violet-600",
            icon: IconReceipt,
          },
          {
            label: "Approved",
            value: money(approved),
            bg: "bg-emerald-50",
            color: "text-emerald-600",
            icon: IconCheck,
          },
          {
            label: "Pending",
            value: money(pending),
            bg: "bg-amber-50",
            color: "text-amber-600",
            icon: IconClock,
          },
          {
            label: "This month",
            value: money(currentMonthTotal),
            bg: "bg-blue-50",
            color: "text-blue-600",
            icon: IconReceipt,
          },
        ].map(({ label, value, bg, color, icon: Icon }) => (
          <Card key={label} className="border border-border shadow-sm overflow-hidden">
            <CardContent
              className={`flex items-center justify-between p-4 ${bg}`}
            >
              <div>
                <p className="font-heading text-xl font-bold">{value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
              </div>

              <Icon size={22} className={color} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold">
              Category breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length ? (
              <>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {pieData.map(({ name }) => (
                        <Cell
                          key={name}
                          fill={categoryColors[name] ?? "#94a3b8"}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [money(value), "Amount"]}
                      contentStyle={{ borderRadius: 10, fontSize: 12 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-2 space-y-2">
                  {pieData.map(({ name, value }) => {
                    const CategoryIcon = categoryIcons[name] ?? IconReceipt;
                    return (
                      <div
                        key={name}
                        className="flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                categoryColors[name] ?? "#94a3b8",
                            }}
                          />
                          <CategoryIcon
                            size={12}
                            className="text-muted-foreground"
                          />
                          <span className="text-muted-foreground">{name}</span>
                        </div>
                        <span className="font-medium">{money(value)}</span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                No expense data yet.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="space-y-3 xl:col-span-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[160px] flex-1">
              <IconSearch
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                aria-label="Search expenses"
                placeholder="Search expenses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="h-9 pl-9"
              />
            </div>
            <Select value={catFilter} onValueChange={setCatFilter}>
              <SelectTrigger className="h-9 w-36">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {["All", ...expenseCategories].map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="h-9 gap-1.5" onClick={openCreate}>
              <IconPlus size={15} /> Add expense
            </Button>
          </div>

          <Card className="overflow-hidden border border-border shadow-sm">
            {expensesQuery.isLoading ? (
              <p className="py-12 text-center text-sm text-muted-foreground">
                Loading expenses...
              </p>
            ) : expensesQuery.isError ? (
              <div className="space-y-3 py-8 text-center">
                <p className="text-sm text-destructive">
                  {errorMessage(expensesQuery.error)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => expensesQuery.refetch()}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      {[
                        "S. No.",
                        "Category",
                        "Description",
                        "Amount",
                        "Date",
                        "Approved by",
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
                    {filtered.map((expense, index) => {
                      const CategoryIcon =
                        categoryIcons[expense.category] ?? IconReceipt;
                      const config = statusConfig[expense.status];
                      const StatusIcon = config.icon;
                      return (
                        <TableRow
                          key={expense.id}
                          className="hover:bg-muted/30"
                        >
                          <TableCell className="font-mono text-xs">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <div
                                className="flex h-6 w-6 items-center justify-center rounded-lg"
                                style={{
                                  backgroundColor: `${categoryColors[expense.category] ?? "#94a3b8"}20`,
                                }}
                              >
                                <CategoryIcon
                                  size={12}
                                  style={{
                                    color:
                                      categoryColors[expense.category] ??
                                      "#94a3b8",
                                  }}
                                />
                              </div>
                              <span className="text-sm font-medium">
                                {expense.category}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                            {expense.description}
                          </TableCell>
                          <TableCell className="text-sm font-semibold">
                            {money(expense.amount)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                            {dateLabel(expense.date)}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {expense.approvedBy || "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${config.color}`}
                            >
                              <StatusIcon size={10} />
                              {expense.status[0] +
                                expense.status.slice(1).toLowerCase()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              {expense.status === "PENDING" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    aria-label={`Approve ${expense.description}`}
                                    disabled={updateMutation.isPending}
                                    onClick={() =>
                                      updateMutation.mutate({
                                        id: expense.id,
                                        status: "APPROVED",
                                      })
                                    }
                                  >
                                    <IconCheck size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    aria-label={`Reject ${expense.description}`}
                                    disabled={updateMutation.isPending}
                                    onClick={() =>
                                      updateMutation.mutate({
                                        id: expense.id,
                                        status: "REJECTED",
                                      })
                                    }
                                  >
                                    <IconX size={14} />
                                  </Button>
                                </>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Edit ${expense.description}`}
                                onClick={() => openEdit(expense)}
                              >
                                <IconEdit size={15} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Delete ${expense.description}`}
                                onClick={() => setDeletingExpense(expense)}
                              >
                                <IconTrash
                                  size={15}
                                  className="text-destructive"
                                />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="h-24 text-center text-muted-foreground"
                        >
                          {search || catFilter !== "All"
                            ? "No expenses match your filters."
                            : "No expenses yet."}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <div className="flex justify-between border-t border-border bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
                  <span>{filtered.length} expenses</span>
                  <span>
                    Total:{" "}
                    {money(
                      filtered.reduce(
                        (sum, expense) => sum + expense.amount,
                        0,
                      ),
                    )}
                  </span>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      <ExpenseFormDialog
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingExpense(null);
        }}
        expense={editingExpense}
      />

      <AlertDialog
        open={Boolean(deletingExpense)}
        onOpenChange={(open) => !open && setDeletingExpense(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this expense?</AlertDialogTitle>
            <AlertDialogDescription>
              “{deletingExpense?.description}” will be removed from the expense
              list. The record will be retained for audit purposes.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={deleteMutation.isPending}
              onClick={(event) => {
                event.preventDefault();
                if (!deletingExpense) return;
                deleteMutation.mutate(deletingExpense.id, {
                  onSuccess: () => setDeletingExpense(null),
                });
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete expense"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
