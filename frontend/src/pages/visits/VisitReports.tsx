import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { visitReports, salesmen } from '../../lib/mock-data';
import {
  IconMapPin, IconCalendar, IconShoppingCart, IconEye, IconBuildingStore,
  IconCheck, IconX, IconClock, IconCamera,
} from '@tabler/icons-react';

const visitChartData = [
  { name: 'Arjun', visits: 8, orders: 5 },
  { name: 'Rahul', visits: 6, orders: 4 },
  { name: 'Kiran', visits: 10, orders: 7 },
  { name: 'Vikas', visits: 12, orders: 9 },
  { name: 'Sanjay', visits: 3, orders: 2 },
  { name: 'Arun', visits: 9, orders: 6 },
];

export default function VisitReports() {
  const [salesmanFilter, setSalesmanFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedVisit, setSelectedVisit] = useState<typeof visitReports[0] | null>(null);

  const filtered = visitReports.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch = v.retailer.toLowerCase().includes(q) || v.salesman.toLowerCase().includes(q);
    const matchSm = salesmanFilter === 'All' || v.salesman === salesmanFilter;
    return matchSearch && matchSm;
  });

  const totalVisits = visitReports.length;
  const ordersVisits = visitReports.filter((v) => v.orderTaken).length;
  const noOrderVisits = visitReports.filter((v) => !v.orderTaken).length;
  const totalOrderValue = visitReports.filter((v) => v.orderTaken).reduce((s, v) => s + v.orderValue, 0);

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Visits', value: totalVisits, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconBuildingStore },
          { label: 'Orders Taken', value: ordersVisits, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconShoppingCart },
          { label: 'No-Order Visits', value: noOrderVisits, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconX },
          { label: 'Order Value', value: `₹${(totalOrderValue / 1000).toFixed(0)}k`, bg: 'bg-blue-50', color: 'text-blue-600', icon: IconShoppingCart },
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
                  <Icon size={22} className={s.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Chart */}
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-sm font-semibold">Today's Visits per Salesman</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={visitChartData} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(60 8% 88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="visits" name="Visits" fill="hsl(262 83% 58%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="orders" name="Orders" fill="hsl(48 96% 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Input placeholder="Search retailer, salesman..." value={search} onChange={(e) => setSearch(e.target.value)} className="h-9" />
        </div>
        <Select value={salesmanFilter} onValueChange={setSalesmanFilter}>
          <SelectTrigger className="w-44 h-9"><SelectValue placeholder="Salesman" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Salesmen</SelectItem>
            {salesmen.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Input type="date" defaultValue="2024-03-19" className="w-36 h-9" />
      </div>

      {/* Table */}
      <Card className="border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {['Visit ID', 'Salesman', 'Retailer', 'Date', 'Time', 'GPS', 'Order Taken', 'Order Value', 'Remarks', 'Actions'].map((h) => (
                  <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((v) => (
                <TableRow key={v.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-xs text-primary">{v.id}</TableCell>
                  <TableCell className="font-medium text-sm">{v.salesman}</TableCell>
                  <TableCell className="font-medium text-sm">{v.retailer}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{v.date}</TableCell>
                  <TableCell className="text-xs text-muted-foreground flex items-center gap-1">
                    <IconClock size={11} />{v.time}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-xs text-blue-600">
                      <IconMapPin size={12} />
                      <span>Captured</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${v.orderTaken ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {v.orderTaken ? <IconCheck size={10} /> : <IconX size={10} />}
                      {v.orderTaken ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {v.orderTaken ? `₹${v.orderValue.toLocaleString('en-IN')}` : '—'}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[180px] truncate">{v.remarks}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => setSelectedVisit(v)}>
                      <IconEye size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Visit Detail Dialog */}
      {selectedVisit && (
        <Dialog open={!!selectedVisit} onOpenChange={() => setSelectedVisit(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">Visit Details — {selectedVisit.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Salesman', value: selectedVisit.salesman },
                  { label: 'Retailer', value: selectedVisit.retailer },
                  { label: 'Date', value: selectedVisit.date },
                  { label: 'Time', value: selectedVisit.time },
                  { label: 'Order Taken', value: selectedVisit.orderTaken ? 'Yes' : 'No' },
                  { label: 'Order Value', value: selectedVisit.orderTaken ? `₹${selectedVisit.orderValue}` : '—' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              {!selectedVisit.orderTaken && selectedVisit.noOrderReason && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="text-xs font-semibold text-amber-700">No Order Reason</p>
                  <p className="text-sm mt-1">{selectedVisit.noOrderReason}</p>
                </div>
              )}
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Remarks</p>
                <p className="text-sm">{selectedVisit.remarks}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-muted/50 h-24 flex flex-col items-center justify-center border-2 border-dashed border-border text-muted-foreground">
                  <IconCamera size={20} />
                  <p className="text-xs mt-1">Retailer Photo</p>
                </div>
                <div className="rounded-xl bg-muted/50 h-24 flex flex-col items-center justify-center border-2 border-dashed border-border text-muted-foreground">
                  <IconCamera size={20} />
                  <p className="text-xs mt-1">Shelf Photo</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
