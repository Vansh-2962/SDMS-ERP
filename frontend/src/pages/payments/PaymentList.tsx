import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  IconCreditCard, IconSearch, IconPlus, IconBuildingBank,
  IconDeviceMobile, IconCash, IconWriting, IconBell, IconCheck,
} from '@tabler/icons-react';

const modeIcon: Record<string, any> = {
  Cash: IconCash, UPI: IconDeviceMobile, NEFT: IconBuildingBank, Cheque: IconWriting,
};

const statusColor: Record<string, string> = {
  Received: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Overdue: 'bg-red-100 text-red-700',
};

const collectionTrend = [
  { day: 'Mon', amount: 28000 }, { day: 'Tue', amount: 45000 }, { day: 'Wed', amount: 32000 },
  { day: 'Thu', amount: 68000 }, { day: 'Fri', amount: 41000 }, { day: 'Sat', amount: 55000 },
];

export default function PaymentList() {
  const { payments, updatePayment } = useAppStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [recordOpen, setRecordOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [utr, setUtr] = useState('');
  const [recDate, setRecDate] = useState(new Date().toISOString().split('T')[0]);

  const filtered = payments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.customerName.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.invoiceId.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchMode = modeFilter === 'All' || p.mode === modeFilter;
    return matchSearch && matchStatus && matchMode;
  });

  const totalCollected = payments.filter((p) => p.status === 'Received').reduce((s, p) => s + p.amount, 0);
  const outstanding = payments.filter((p) => p.status !== 'Received').reduce((s, p) => s + p.amount, 0);
  const overdue = payments.filter((p) => p.status === 'Overdue').reduce((s, p) => s + p.amount, 0);
  const thisMonth = payments.filter((p) => p.status === 'Received' && p.date.startsWith('2024-03')).reduce((s, p) => s + p.amount, 0);

  const handleMarkReceived = () => {
    if (selectedId) {
      updatePayment(selectedId, { status: 'Received', utrRef: utr, date: recDate });
      setRecordOpen(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Collected', value: `₹${(totalCollected / 1000).toFixed(0)}k`, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconCheck },
          { label: 'Outstanding', value: `₹${(outstanding / 1000).toFixed(0)}k`, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconCreditCard },
          { label: 'Overdue', value: `₹${(overdue / 1000).toFixed(0)}k`, bg: 'bg-red-50', color: 'text-red-600', icon: IconBell },
          { label: 'This Month', value: `₹${(thisMonth / 1000).toFixed(0)}k`, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconCreditCard },
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

      {/* Chart + Overdue */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-semibold">Weekly Collection Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={collectionTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(60 8% 88%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(60 5% 44%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(60 5% 44%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Collection']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="amount" fill="hsl(262 83% 58%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
              <IconBell size={16} className="text-red-500" /> Overdue Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {payments.filter((p) => p.status === 'Overdue').map((p) => (
              <div key={p.id} className="p-3 rounded-lg bg-red-50 border border-red-100">
                <p className="text-sm font-semibold text-foreground">{p.customerName}</p>
                <p className="text-xs text-muted-foreground">{p.invoiceId}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="font-bold text-red-700">₹{p.amount.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-red-600">Due: {p.dueDate}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by customer, invoice..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            {['All', 'Received', 'Pending', 'Overdue'].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={modeFilter} onValueChange={setModeFilter}>
          <SelectTrigger className="w-32 h-9"><SelectValue placeholder="Mode" /></SelectTrigger>
          <SelectContent>
            {['All', 'Cash', 'UPI', 'NEFT', 'Cheque'].map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button className="h-9 gap-1.5" onClick={() => setRecordOpen(true)}>
          <IconPlus size={15} /> Record Payment
        </Button>
      </div>

      {/* Table */}
      <Card className="border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {['Pay ID', 'Customer', 'Invoice', 'Amount', 'Mode', 'Date', 'Due Date', 'Status', 'Actions'].map((h) => (
                  <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const ModeIcon = modeIcon[p.mode] || IconCreditCard;
                return (
                  <TableRow key={p.id} className={`hover:bg-muted/30 ${p.status === 'Overdue' ? 'bg-red-50/40' : ''}`}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell className="font-medium text-sm">{p.customerName}</TableCell>
                    <TableCell className="font-mono text-xs text-primary">{p.invoiceId}</TableCell>
                    <TableCell className="font-semibold text-sm">₹{p.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ModeIcon size={13} />
                        <span>{p.mode}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.date || '—'}</TableCell>
                    <TableCell className={`text-xs ${p.status === 'Overdue' ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>{p.dueDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[p.status] || 'bg-gray-100 text-gray-600'}`}>
                        {p.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {p.status !== 'Received' && (
                        <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => { setSelectedId(p.id); setRecordOpen(true); }}>
                          <IconCheck size={12} /> Collect
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={recordOpen} onOpenChange={setRecordOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Record Payment Collection</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>UTR / Reference No.</Label>
              <Input value={utr} onChange={(e) => setUtr(e.target.value)} placeholder="NEFT ref or cheque no." />
            </div>
            <div className="space-y-1.5">
              <Label>Collection Date</Label>
              <Input type="date" value={recDate} onChange={(e) => setRecDate(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRecordOpen(false)}>Cancel</Button>
            <Button onClick={handleMarkReceived}>Mark as Received</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
