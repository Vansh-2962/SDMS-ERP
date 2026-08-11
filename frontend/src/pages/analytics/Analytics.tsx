import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend,
  ScatterChart, Scatter,
} from 'recharts';
import {
  IconTrendingUp, IconTrendingDown, IconStar, IconAlertTriangle,
  IconRepeat, IconUserOff, IconFlame, IconMap,
} from '@tabler/icons-react';

const COLORS = ['#7c3aed', '#eab308', '#22c55e', '#3b82f6', '#ef4444', '#f97316'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-border rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' && p.value > 1000 ? `₹${p.value.toLocaleString('en-IN')}` : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const salesGrowthData = [
  { month: 'Oct', revenue: 285000, orders: 180, customers: 38 },
  { month: 'Nov', revenue: 320000, orders: 210, customers: 42 },
  { month: 'Dec', revenue: 410000, orders: 268, customers: 48 },
  { month: 'Jan', revenue: 298000, orders: 195, customers: 40 },
  { month: 'Feb', revenue: 345000, orders: 228, customers: 45 },
  { month: 'Mar', revenue: 428000, orders: 280, customers: 52 },
];

const bestSelling = [
  { name: 'Kitchen King Masala', units: 4800, revenue: 345600, growth: 22.1 },
  { name: 'Garam Masala 50g', units: 4200, revenue: 193200, growth: 15.4 },
  { name: 'Turmeric Powder 100g', units: 3900, revenue: 124800, growth: 8.3 },
  { name: 'Red Chilli Powder 200g', units: 3200, revenue: 192000, growth: 11.7 },
  { name: 'Cumin Powder 100g', units: 2800, revenue: 140000, growth: 5.2 },
];

const slowMoving = [
  { name: 'Cardamom 50g', units: 180, revenue: 36000, daysWithout: 45 },
  { name: 'Fenugreek Seeds 200g', units: 95, revenue: 5700, daysWithout: 62 },
  { name: 'Star Anise 30g', units: 60, revenue: 4200, daysWithout: 78 },
];

const customerSegments = [
  { name: 'Repeat (3+ orders)', value: 32, color: '#22c55e' },
  { name: 'Occasional (1-2 orders)', value: 18, color: '#eab308' },
  { name: 'New (this month)', value: 8, color: '#7c3aed' },
  { name: 'Lost (>60 days)', value: 5, color: '#ef4444' },
];

const repeatCustomers = [
  { name: 'Ravi Distributors', orders: 18, revenue: 320000, lastOrder: '3 days ago', status: 'Active' },
  { name: 'North India Traders', orders: 14, revenue: 485000, lastOrder: '5 days ago', status: 'Active' },
  { name: 'Chennai Wholesale Hub', orders: 12, revenue: 298000, lastOrder: '1 week ago', status: 'Active' },
  { name: 'Metro Supermarket', orders: 9, revenue: 245000, lastOrder: '10 days ago', status: 'Active' },
];

const lostCustomers = [
  { name: 'Quick Grocer', lastOrder: '68 days ago', revenue: 42000, risk: 'High' },
  { name: 'Sunrise Stores', lastOrder: '75 days ago', revenue: 28000, risk: 'High' },
  { name: 'Palace Mart', lastOrder: '55 days ago', revenue: 65000, risk: 'Medium' },
];

const heatMapData = [
  { area: 'Delhi', lat: 28.6, lng: 77.2, revenue: 485000, intensity: 95 },
  { area: 'Bangalore', lat: 12.97, lng: 77.59, revenue: 530000, intensity: 100 },
  { area: 'Ahmedabad', lat: 23.02, lng: 72.57, revenue: 380000, intensity: 72 },
  { area: 'Chennai', lat: 13.08, lng: 80.27, revenue: 298000, intensity: 56 },
  { area: 'Hyderabad', lat: 17.38, lng: 78.47, revenue: 165000, intensity: 31 },
];

const cohortData = [
  { week: 'W1', newCustomers: 5, retained: 5, churned: 0 },
  { week: 'W2', newCustomers: 8, retained: 11, churned: 2 },
  { week: 'W3', newCustomers: 6, retained: 13, churned: 4 },
  { week: 'W4', newCustomers: 4, retained: 14, churned: 5 },
];

export default function Analytics() {
  return (
    <div className="space-y-5">
      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Revenue Growth MoM', value: '+23.8%', sub: 'vs last month', up: true, icon: IconTrendingUp, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Best Seller', value: 'Kitchen King', sub: '4,800 units / month', up: true, icon: IconStar, bg: 'bg-amber-50', color: 'text-amber-600' },
          { label: 'Repeat Rate', value: '74%', sub: '32 of 43 customers', up: true, icon: IconRepeat, bg: 'bg-violet-50', color: 'text-violet-600' },
          { label: 'At-Risk Customers', value: '5', sub: 'No order > 60 days', up: false, icon: IconUserOff, bg: 'bg-red-50', color: 'text-red-600' },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border border-border shadow-sm">
              <CardContent className={`p-4 ${s.bg}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{s.sub}</p>
                  </div>
                  <Icon size={22} className={s.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Sales Growth + Customer Segments */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconTrendingUp size={16} className="text-primary" /> Sales Growth Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={salesGrowthData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(262 83% 58%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(262 83% 58%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ordGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(48 96% 53%)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="hsl(48 96% 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(60 8% 88%)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="rev" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <YAxis yAxisId="ord" orientation="right" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area yAxisId="rev" type="monotone" dataKey="revenue" name="Revenue" stroke="hsl(262 83% 58%)" strokeWidth={2.5} fill="url(#revGrad)" dot={{ r: 4, fill: 'hsl(262 83% 58%)' }} />
                <Line yAxisId="ord" type="monotone" dataKey="orders" name="Orders" stroke="hsl(48 96% 53%)" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconRepeat size={16} className="text-primary" /> Customer Segments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={customerSegments} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                  {customerSegments.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [v, 'Customers']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-1">
              {customerSegments.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                    <span className="text-muted-foreground">{s.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{s.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Best Selling + Slow Moving */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconFlame size={16} className="text-amber-500" /> Best Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bestSelling.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? 'bg-amber-400 text-white' : i === 1 ? 'bg-gray-300 text-gray-700' : i === 2 ? 'bg-amber-700 text-white' : 'bg-muted text-muted-foreground'}`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <span className="text-xs text-emerald-600 font-medium ml-2 flex-shrink-0">↑{p.growth}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(p.units / bestSelling[0].units) * 100}%`,
                          backgroundColor: COLORS[i] || '#7c3aed',
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-20 text-right">{p.units.toLocaleString('en-IN')} units</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-foreground">₹{(p.revenue / 1000).toFixed(0)}k</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconAlertTriangle size={16} className="text-amber-500" /> Slow Moving Products
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {slowMoving.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.units} units sold this month</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-amber-700">{p.daysWithout} days</p>
                  <p className="text-[10px] text-amber-600">without reorder</p>
                </div>
              </div>
            ))}
            <div className="p-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs text-red-700 font-semibold mb-1">Action Required</p>
              <p className="text-xs text-red-600">Consider running promotions or discounts on slow-moving SKUs to free up warehouse space.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Repeat + Lost Customers */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconRepeat size={16} className="text-emerald-500" /> Top Repeat Customers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {repeatCustomers.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">
                    {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.orders} orders · Last: {c.lastOrder}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-700">₹{(c.revenue / 1000).toFixed(0)}k</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Active</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconUserOff size={16} className="text-red-500" /> Lost / At-Risk Customers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {lostCustomers.map((c, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${c.risk === 'High' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">Last order: {c.lastOrder}</p>
                  <p className="text-xs text-muted-foreground">Revenue: ₹{c.revenue.toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${c.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                    {c.risk} Risk
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1">Send reminder</p>
                </div>
              </div>
            ))}
            <div className="p-3 rounded-xl bg-violet-50 border border-violet-100">
              <p className="text-xs text-violet-700 font-semibold">Recovery Tip</p>
              <p className="text-xs text-violet-600 mt-0.5">WhatsApp these customers with a special offer to re-engage them.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Heat Map & Cohort */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconMap size={16} className="text-primary" /> Sales Heat Map — By Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {heatMapData.map((h) => (
                <div key={h.area} className="flex items-center gap-3">
                  <span className="text-sm font-medium w-24 flex-shrink-0">{h.area}</span>
                  <div className="flex-1 h-6 bg-muted rounded-lg overflow-hidden relative">
                    <div
                      className="h-full rounded-lg transition-all duration-500 flex items-center justify-end pr-2"
                      style={{
                        width: `${h.intensity}%`,
                        background: `linear-gradient(90deg, hsl(262 83% 58% / 0.4), hsl(262 83% 58%))`,
                      }}
                    >
                      <span className="text-xs font-bold text-white">{h.intensity}%</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-foreground w-20 text-right">
                    ₹{(h.revenue / 1000).toFixed(0)}k
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconTrendingUp size={16} className="text-primary" /> Customer Cohort — Weekly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cohortData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(60 8% 88%)" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="newCustomers" name="New" fill="hsl(262 83% 58%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="retained" name="Retained" fill="hsl(142 71% 45%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" name="Churned" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
