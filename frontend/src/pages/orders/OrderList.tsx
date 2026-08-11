import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  IconShoppingCart, IconPlus, IconSearch, IconEye, IconEdit,
  IconX, IconTruckDelivery, IconPackage, IconCircleCheck, IconClock,
} from '@tabler/icons-react';

const statusConfig: Record<string, { color: string; icon: any }> = {
  Pending:    { color: 'bg-amber-100 text-amber-700',   icon: IconClock },
  Packed:     { color: 'bg-blue-100 text-blue-700',     icon: IconPackage },
  Dispatched: { color: 'bg-violet-100 text-violet-700', icon: IconTruckDelivery },
  Delivered:  { color: 'bg-emerald-100 text-emerald-700', icon: IconCircleCheck },
  Cancelled:  { color: 'bg-red-100 text-red-700',       icon: IconX },
};

export default function OrderList() {
  const navigate = useNavigate();
  const { salesOrders, updateOrderStatus } = useAppStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = salesOrders.filter((o) => {
    const q = search.toLowerCase();
    const matchSearch = o.id.toLowerCase().includes(q) || o.customerName.toLowerCase().includes(q) || o.salesman.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = salesOrders.reduce<Record<string, number>>((acc, o) => { acc[o.status] = (acc[o.status] || 0) + 1; return acc; }, {});
  const totalValue = salesOrders.reduce((s, o) => s + o.total, 0);

  const summaryCards = [
    { label: 'Total Orders', value: salesOrders.length, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconShoppingCart },
    { label: 'Pending', value: counts['Pending'] || 0, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconClock },
    { label: 'Dispatched', value: counts['Dispatched'] || 0, bg: 'bg-blue-50', color: 'text-blue-600', icon: IconTruckDelivery },
    { label: 'Delivered', value: counts['Delivered'] || 0, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconCircleCheck },
    { label: 'Total Value', value: `₹${(totalValue / 1000).toFixed(0)}k`, bg: 'bg-olive-50', color: 'text-olive-600', icon: IconShoppingCart },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {summaryCards.map((s) => {
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search order ID, customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {['All', 'Pending', 'Packed', 'Dispatched', 'Delivered', 'Cancelled'].map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => navigate('/orders/new')} className="h-9 gap-1.5">
          <IconPlus size={15} />
          New Order
        </Button>
      </div>

      <Card className="border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {['Order ID', 'Customer', 'Date', 'Items', 'Subtotal', 'GST', 'Total', 'Salesman', 'Status', 'Actions'].map((h) => (
                  <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">No orders found.</TableCell>
                </TableRow>
              ) : (
                filtered.map((o) => {
                  const sc = statusConfig[o.status] || statusConfig['Pending'];
                  const StatusIcon = sc.icon;
                  return (
                    <TableRow key={o.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs font-medium text-primary">{o.id}</TableCell>
                      <TableCell className="font-medium text-sm">{o.customerName}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{o.date}</TableCell>
                      <TableCell className="text-center text-sm font-medium">{o.items.length}</TableCell>
                      <TableCell className="text-sm">₹{o.subtotal.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">₹{o.gstAmount.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="font-semibold text-sm">₹{o.total.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{o.salesman}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                          <StatusIcon size={11} />
                          {o.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary">
                            <IconEye size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => navigate(`/orders/${o.id}/edit`)}>
                            <IconEdit size={14} />
                          </Button>
                          {o.status !== 'Cancelled' && o.status !== 'Delivered' && (
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => updateOrderStatus(o.id, 'Cancelled')}>
                              <IconX size={14} />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-2 border-t border-border bg-muted/20 text-xs text-muted-foreground">
          Showing {filtered.length} of {salesOrders.length} orders
        </div>
      </Card>
    </div>
  );
}
