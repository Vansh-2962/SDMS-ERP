import {
  IconCurrencyRupee,
  IconTrendingUp,
  IconAlertCircle,
  IconUsers,
  IconPackage,
  IconArrowUpRight,
  IconArrowDownRight,
  IconMapPin,
  IconBriefcase,
  IconShoppingCart,
} from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  monthlySalesData,
  productSalesData,
  topDistributors,
} from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/appStore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/features/auth/hooks/use-auth";

const formatINR = (val: number) => "₹" + val.toLocaleString("en-IN");

const statCards = [
  {
    label: "Today's Sales",
    value: "₹1,28,450",
    icon: IconCurrencyRupee,
    change: "+8.4%",
    positive: true,
    gradient: "from-violet-500 to-violet-700",
    bg: "bg-violet-50",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    label: "Monthly Sales",
    value: "₹42,80,000",
    icon: IconTrendingUp,
    change: "+6.9%",
    positive: true,
    gradient: "from-olive-500 to-olive-700",
    bg: "bg-olive-50",
    iconBg: "bg-olive-100",
    iconColor: "text-olive-600",
  },
  {
    label: "Outstanding",
    value: "₹3,80,800",
    icon: IconAlertCircle,
    change: "-2.1%",
    positive: false,
    gradient: "from-amber-500 to-amber-700",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    label: "Active Distributors",
    value: "5",
    icon: IconUsers,
    change: "+1 this month",
    positive: true,
    gradient: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-border rounded-xl shadow-lg p-3 text-sm">
        <p className="font-heading font-semibold text-foreground mb-1">
          {label}
        </p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {formatINR(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { inventory, salesmen } = useAppStore();
  const lowStockItems = inventory.filter((i) => i.status === "Low");
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          GoldSpice Industries — Sales & Distribution Overview
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className="border border-border shadow-sm overflow-hidden"
            >
              <CardContent className="p-0">
                <div className={`${card.bg} px-5 pt-5 pb-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${card.iconBg} p-2.5 rounded-xl`}>
                      <Icon size={20} className={card.iconColor} />
                    </div>
                    <span
                      className={`flex items-center gap-0.5 text-xs font-medium ${
                        card.positive ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {card.positive ? (
                        <IconArrowUpRight size={14} />
                      ) : (
                        <IconArrowDownRight size={14} />
                      )}
                      {card.change}
                    </span>
                  </div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {card.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {card.label}
                  </p>
                </div>
                <div className={`h-1 bg-gradient-to-r ${card.gradient}`} />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Monthly Sales Bar Chart */}
        <Card className="xl:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-semibold flex items-center gap-2">
              <IconTrendingUp size={18} className="text-primary" />
              Monthly Sales vs Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={monthlySalesData} barCategoryGap="30%">
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(60 8% 88%)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "hsl(60 5% 44%)" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(60 5% 44%)" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Bar
                  dataKey="sales"
                  name="Sales"
                  fill="hsl(262 83% 58%)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="target"
                  name="Target"
                  fill="hsl(82 28% 65%)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="collection"
                  name="Collection"
                  fill="hsl(48 96% 53%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Product Sales Pie Chart */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-semibold flex items-center gap-2">
              <IconPackage size={18} className="text-primary" />
              Product Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={productSalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {productSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val) => [`${val}%`, "Share"]}
                  contentStyle={{
                    borderRadius: 10,
                    border: "1px solid hsl(60 8% 88%)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {productSalesData.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-muted-foreground truncate max-w-[120px]">
                      {d.name}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {d.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Top Distributors */}
        <Card className="xl:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-semibold flex items-center gap-2">
              <IconBriefcase size={18} className="text-primary" />
              Top Distributors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="text-xs font-semibold pl-6">
                    Distributor
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-right">
                    Sales
                  </TableHead>
                  <TableHead className="text-xs font-semibold text-right pr-6">
                    Growth
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDistributors.map((d, i) => (
                  <TableRow key={d.name} className="hover:bg-muted/30">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                          {i + 1}
                        </div>
                        <span className="font-medium text-sm text-foreground">
                          {d.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">
                      {formatINR(d.sales)}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <span
                        className={`flex items-center justify-end gap-0.5 text-xs font-semibold ${
                          d.growth >= 0 ? "text-emerald-600" : "text-red-500"
                        }`}
                      >
                        {d.growth >= 0 ? (
                          <IconArrowUpRight size={13} />
                        ) : (
                          <IconArrowDownRight size={13} />
                        )}
                        {Math.abs(d.growth)}%
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-semibold flex items-center gap-2">
              <IconAlertCircle size={18} className="text-amber-500" />
              Low Stock Alerts
              <Badge className="ml-auto bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">
                {lowStockItems.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStockItems.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">
                All stock levels OK
              </p>
            ) : (
              lowStockItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <IconPackage size={16} className="text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                    <div className="mt-1.5 w-full bg-amber-100 rounded-full h-1.5">
                      <div
                        className="bg-amber-500 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (item.currentStock / item.reorderLevel) * 100,
                          )}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-amber-700 mt-1">
                      {item.currentStock.toLocaleString()} {item.unit} /
                      Reorder: {item.reorderLevel.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Today's Salesman Activity */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base font-semibold flex items-center gap-2">
            <IconMapPin size={18} className="text-primary" />
            Today's Salesman Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="text-xs font-semibold pl-6">
                  Salesman
                </TableHead>
                <TableHead className="text-xs font-semibold">
                  Territory
                </TableHead>
                <TableHead className="text-xs font-semibold text-center">
                  Visits
                </TableHead>
                <TableHead className="text-xs font-semibold text-center">
                  Pending
                </TableHead>
                <TableHead className="text-xs font-semibold text-center">
                  Orders
                </TableHead>
                <TableHead className="text-xs font-semibold text-right">
                  Collection
                </TableHead>
                <TableHead className="text-xs font-semibold text-center">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold pr-6">
                  Last Seen
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesmen.map((sm) => (
                <TableRow key={sm.id} className="hover:bg-muted/30">
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary uppercase">
                        {sm.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {sm.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {sm.loginId}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {sm.territory}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {sm.todayVisits}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                        sm.pendingVisits > 4
                          ? "bg-red-100 text-red-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {sm.pendingVisits}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground">
                      <IconShoppingCart
                        size={12}
                        className="text-muted-foreground"
                      />
                      {sm.ordersBooked}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm text-emerald-700">
                    {formatINR(sm.collectionToday)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      className={
                        sm.status === "Active"
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-100"
                      }
                    >
                      {sm.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground pr-6">
                    {sm.lastSeen}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
