import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { gstReportData, monthlySalesData } from '../../lib/mock-data';
import {
  IconChartBar, IconDownload, IconFileSpreadsheet, IconPrinter,
  IconTrendingUp, IconCurrencyRupee, IconPackage, IconUsers,
} from '@tabler/icons-react';

const productWiseSales = [
  { product: 'Turmeric Powder 100g',    qty: 2400, revenue: 76800, growth: 12.5 },
  { product: 'Red Chilli Powder 200g',  qty: 1820, revenue: 109200, growth: 8.3 },
  { product: 'Garam Masala 50g',        qty: 2970, revenue: 136620, growth: 22.1 },
  { product: 'Cumin Powder 100g',       qty: 1200, revenue: 60000, growth: -4.2 },
  { product: 'Kitchen King Masala 100g',qty: 1800, revenue: 122400, growth: 15.7 },
  { product: 'Cardamom 50g',            qty: 360, revenue: 72000, growth: 5.9 },
];

const salesmanWiseSales = [
  { name: 'Arjun Singh', area: 'Bangalore South', orders: 42, revenue: 285000, collection: 272000, visitPct: 88 },
  { name: 'Rahul Mehta', area: 'Bangalore North', orders: 38, revenue: 245000, collection: 235000, visitPct: 85 },
  { name: 'Kiran Shah',  area: 'Ahmedabad West', orders: 55, revenue: 380000, collection: 368000, visitPct: 94 },
  { name: 'Vikas Gupta', area: 'Delhi Central',  orders: 70, revenue: 485000, collection: 478000, visitPct: 97 },
  { name: 'Arun Kumar',  area: 'Chennai South',  orders: 48, revenue: 298000, collection: 280000, visitPct: 91 },
];

const areaWiseSales = [
  { area: 'Delhi', revenue: 485000 },
  { area: 'Ahmedabad', revenue: 380000 },
  { area: 'Chennai', revenue: 298000 },
  { area: 'Bangalore', revenue: 530000 },
  { area: 'Hyderabad', revenue: 165000 },
];

const COLORS = ['#7c3aed', '#eab308', '#22c55e', '#3b82f6', '#ef4444'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-border rounded-xl shadow-lg p-3 text-xs">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: ₹{Number(p.value).toLocaleString('en-IN')}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  return (
    <div className="space-y-5">
      {/* Actions */}
      <div className="flex items-center gap-2 justify-end">
        {[
          { label: 'Export Excel', icon: IconFileSpreadsheet },
          { label: 'Download PDF', icon: IconDownload },
          { label: 'Print', icon: IconPrinter },
        ].map(({ label, icon: Icon }) => (
          <Button key={label} variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
            <Icon size={13} /> {label}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="sales">
        <TabsList className="bg-muted/60 p-1 flex-wrap gap-1 h-auto">
          {[
            'Sales Report', 'Product-wise', 'Salesman-wise', 'Area-wise',
            'Collection', 'Outstanding', 'GST Report', 'Stock Report',
          ].map((t) => (
            <TabsTrigger key={t} value={t.toLowerCase().replace(/ /g, '-').replace('-report', '')} className="text-xs">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Sales Report */}
        <TabsContent value="sales" className="mt-4 space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Monthly Sales', value: '₹4,28,000', icon: IconTrendingUp, bg: 'bg-violet-50', color: 'text-violet-600' },
              { label: 'Avg Order Value', value: '₹12,450', icon: IconCurrencyRupee, bg: 'bg-emerald-50', color: 'text-emerald-600' },
              { label: 'Orders Count', value: '253', icon: IconPackage, bg: 'bg-blue-50', color: 'text-blue-600' },
              { label: 'Active Customers', value: '5', icon: IconUsers, bg: 'bg-amber-50', color: 'text-amber-600' },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} className="border border-border shadow-sm">
                  <CardContent className={`p-4 ${s.bg}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                      </div>
                      <Icon size={20} className={s.color} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2"><IconChartBar size={16} className="text-primary" /> Monthly Sales vs Target vs Collection</span>
                <div className="flex items-center gap-2">
                  <Input type="date" defaultValue="2024-01-01" className="h-7 w-32 text-xs" />
                  <Input type="date" defaultValue="2024-03-31" className="h-7 w-32 text-xs" />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={monthlySalesData} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(60 8% 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="sales" name="Sales" fill="hsl(262 83% 58%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" name="Target" fill="hsl(82 28% 65%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="collection" name="Collection" fill="hsl(48 96% 53%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Product-wise */}
        <TabsContent value="product-wise" className="mt-4 space-y-4">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">Product-wise Sales Report</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Product', 'Qty Sold', 'Revenue', 'Growth', 'Contribution %'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productWiseSales.map((p, i) => {
                    const totalRev = productWiseSales.reduce((s, x) => s + x.revenue, 0);
                    return (
                      <TableRow key={i} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-sm">{p.product}</TableCell>
                        <TableCell className="text-sm">{p.qty.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="font-semibold text-sm">₹{p.revenue.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                          <span className={`text-sm font-medium flex items-center gap-0.5 ${p.growth >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {p.growth >= 0 ? '↑' : '↓'} {Math.abs(p.growth)}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${(p.revenue / totalRev) * 100}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">{((p.revenue / totalRev) * 100).toFixed(0)}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Salesman-wise */}
        <TabsContent value="salesman-wise" className="mt-4">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">Salesman-wise Performance Report</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Salesman', 'Area', 'Orders', 'Revenue', 'Collection', 'Efficiency', 'Visit %'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesmanWiseSales.map((s, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-sm">{s.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{s.area}</TableCell>
                      <TableCell className="text-sm font-medium text-center">{s.orders}</TableCell>
                      <TableCell className="font-semibold text-sm">₹{s.revenue.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="font-semibold text-sm text-emerald-700">₹{s.collection.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-medium ${s.collection / s.revenue >= 0.95 ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {((s.collection / s.revenue) * 100).toFixed(0)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${s.visitPct}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{s.visitPct}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Area-wise */}
        <TabsContent value="area-wise" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">Area-wise Sales Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={areaWiseSales} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(60 8% 88%)" />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                    <YAxis dataKey="area" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                    <Bar dataKey="revenue" fill="hsl(262 83% 58%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={areaWiseSales} dataKey="revenue" nameKey="area" cx="50%" cy="50%" outerRadius={90} paddingAngle={3}>
                      {areaWiseSales.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Collection */}
        <TabsContent value="collection" className="mt-4">
          <Card className="border border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">Monthly Collection Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={monthlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(60 8% 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="sales" name="Sales" stroke="hsl(262 83% 58%)" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="collection" name="Collection" stroke="hsl(48 96% 53%)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Outstanding */}
        <TabsContent value="outstanding" className="mt-4">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">Outstanding Report — Ageing Analysis</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Customer', 'Type', '0-30 days', '31-60 days', '61-90 days', '90+ days', 'Total Outstanding'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'North India Traders', type: 'Distributor', d30: 0, d60: 38080, d90: 0, d90p: 150000 },
                    { name: 'Metro Supermarket', type: 'Modern Trade', d30: 10304, d60: 0, d90: 0, d90p: 0 },
                    { name: 'Quick Grocer', type: 'Retailer', d30: 0, d60: 0, d90: 8500, d90p: 0 },
                  ].map((r, i) => {
                    const total = r.d30 + r.d60 + r.d90 + r.d90p;
                    return (
                      <TableRow key={i} className="hover:bg-muted/30">
                        <TableCell className="font-medium text-sm">{r.name}</TableCell>
                        <TableCell className="text-xs"><span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">{r.type}</span></TableCell>
                        <TableCell className={r.d30 > 0 ? 'font-medium text-amber-700' : 'text-muted-foreground'}>
                          {r.d30 > 0 ? `₹${r.d30.toLocaleString('en-IN')}` : '—'}
                        </TableCell>
                        <TableCell className={r.d60 > 0 ? 'font-medium text-orange-700' : 'text-muted-foreground'}>
                          {r.d60 > 0 ? `₹${r.d60.toLocaleString('en-IN')}` : '—'}
                        </TableCell>
                        <TableCell className={r.d90 > 0 ? 'font-medium text-red-600' : 'text-muted-foreground'}>
                          {r.d90 > 0 ? `₹${r.d90.toLocaleString('en-IN')}` : '—'}
                        </TableCell>
                        <TableCell className={r.d90p > 0 ? 'font-bold text-red-700' : 'text-muted-foreground'}>
                          {r.d90p > 0 ? `₹${r.d90p.toLocaleString('en-IN')}` : '—'}
                        </TableCell>
                        <TableCell className="font-bold text-sm text-red-700">₹{total.toLocaleString('en-IN')}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* GST */}
        <TabsContent value="gst" className="mt-4">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">GST Summary Report</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Month', 'Taxable Value', 'CGST', 'SGST', 'IGST', 'Total GST', 'Invoice Value'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gstReportData.map((g, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-sm">{g.month}</TableCell>
                      <TableCell className="text-sm">₹{g.taxableValue.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-sm">₹{g.cgst.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-sm">₹{g.sgst.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-sm">₹{g.igst.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="font-semibold text-sm text-primary">₹{(g.cgst + g.sgst + g.igst).toLocaleString('en-IN')}</TableCell>
                      <TableCell className="font-bold text-sm">₹{g.total.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Stock */}
        <TabsContent value="stock" className="mt-4">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">Stock Report — Current Position</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Item', 'Type', 'Unit', 'Opening', 'Received', 'Issued', 'Closing', 'Value'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { item: 'Turmeric Root (Dried)', type: 'RM', unit: 'Kg', opening: 4800, received: 1000, issued: 600, closing: 5200, rate: 95 },
                    { item: 'Red Chilli (Dry)', type: 'RM', unit: 'Kg', opening: 980, received: 0, issued: 200, closing: 780, rate: 180 },
                    { item: 'HDPE Pouch 100g', type: 'PM', unit: 'Pcs', opening: 14000, received: 3000, issued: 2000, closing: 15000, rate: 1.2 },
                    { item: 'Turmeric Powder 100g', type: 'FG', unit: 'Pcs', opening: 2000, received: 1950, issued: 1500, closing: 2450, rate: 30 },
                    { item: 'Red Chilli Powder 200g', type: 'FG', unit: 'Pcs', opening: 1500, received: 1000, issued: 680, closing: 1820, rate: 54 },
                  ].map((r, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-sm">{r.item}</TableCell>
                      <TableCell><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.type === 'RM' ? 'bg-blue-100 text-blue-700' : r.type === 'PM' ? 'bg-violet-100 text-violet-700' : 'bg-emerald-100 text-emerald-700'}`}>{r.type}</span></TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.unit}</TableCell>
                      <TableCell className="text-sm">{r.opening.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-sm text-emerald-700">{r.received.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-sm text-red-600">{r.issued.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="font-bold text-sm">{r.closing.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="font-semibold text-sm text-primary">₹{(r.closing * r.rate).toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
