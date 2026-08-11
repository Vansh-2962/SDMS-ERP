import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  IconReceipt, IconPlus, IconSearch, IconCheck, IconX, IconClock,
  IconGasStation, IconUsers, IconTruck, IconHome, IconBolt, IconPackage, IconBrandInstagram,
} from '@tabler/icons-react';

const categoryIcons: Record<string, any> = {
  Diesel: IconGasStation, Salary: IconUsers, Courier: IconTruck,
  Rent: IconHome, Electricity: IconBolt, Packaging: IconPackage, Marketing: IconBrandInstagram,
};

const categoryColors: Record<string, string> = {
  Diesel: '#f59e0b', Salary: '#8b5cf6', Courier: '#3b82f6',
  Rent: '#ef4444', Electricity: '#f97316', Packaging: '#22c55e', Marketing: '#ec4899',
};

const statusConfig: Record<string, { color: string; icon: any }> = {
  Approved: { color: 'bg-emerald-100 text-emerald-700', icon: IconCheck },
  Pending:  { color: 'bg-amber-100 text-amber-700',   icon: IconClock },
  Rejected: { color: 'bg-red-100 text-red-700',       icon: IconX },
};

export default function Expenses() {
  const { expenses, addExpense } = useAppStore();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [addOpen, setAddOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({ category: 'Diesel', description: '', amount: '', date: '' });

  const filtered = expenses.filter((e) => {
    const q = search.toLowerCase();
    const matchSearch = e.description.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    const matchCat = catFilter === 'All' || e.category === catFilter;
    return matchSearch && matchCat;
  });

  const totalExpense = expenses.reduce((s, e) => s + e.amount, 0);
  const approved = expenses.filter((e) => e.status === 'Approved').reduce((s, e) => s + e.amount, 0);
  const pending = expenses.filter((e) => e.status === 'Pending').reduce((s, e) => s + e.amount, 0);

  const pieData = Object.entries(
    expenses.reduce<Record<string, number>>((acc, e) => { acc[e.category] = (acc[e.category] || 0) + e.amount; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const handleAdd = () => {
    if (!newExpense.description || !newExpense.amount) return;
    addExpense({
      id: `EXP${Date.now()}`,
      category: newExpense.category,
      description: newExpense.description,
      amount: Number(newExpense.amount),
      date: newExpense.date || new Date().toISOString().split('T')[0],
      approvedBy: '',
      status: 'Pending',
    });
    setAddOpen(false);
    setNewExpense({ category: 'Diesel', description: '', amount: '', date: '' });
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Expenses', value: `₹${(totalExpense / 1000).toFixed(0)}k`, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconReceipt },
          { label: 'Approved', value: `₹${(approved / 1000).toFixed(0)}k`, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconCheck },
          { label: 'Pending', value: `₹${(pending / 1000).toFixed(0)}k`, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconClock },
          { label: 'This Month', value: `₹${(totalExpense / 1000).toFixed(0)}k`, bg: 'bg-blue-50', color: 'text-blue-600', icon: IconReceipt },
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Category Breakdown */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-sm font-semibold">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={categoryColors[entry.name] || '#94a3b8'} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`₹${v.toLocaleString('en-IN')}`, 'Amount']} contentStyle={{ borderRadius: 10, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {pieData.map(({ name, value }) => {
                const Icon = categoryIcons[name] || IconReceipt;
                return (
                  <div key={name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: categoryColors[name] || '#94a3b8' }} />
                      <Icon size={12} className="text-muted-foreground" />
                      <span className="text-muted-foreground">{name}</span>
                    </div>
                    <span className="font-medium text-foreground">₹{value.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <div className="xl:col-span-2 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[160px]">
              <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search expenses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={catFilter} onValueChange={setCatFilter}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {['All', 'Diesel', 'Salary', 'Courier', 'Rent', 'Electricity', 'Packaging', 'Marketing'].map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
              <IconPlus size={15} /> Add Expense
            </Button>
          </div>

          <Card className="border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['ID', 'Category', 'Description', 'Amount', 'Date', 'Approved By', 'Status'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((e) => {
                    const CatIcon = categoryIcons[e.category] || IconReceipt;
                    const sc = statusConfig[e.status] || statusConfig['Pending'];
                    const StatusIcon = sc.icon;
                    return (
                      <TableRow key={e.id} className="hover:bg-muted/30">
                        <TableCell className="font-mono text-xs">{e.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: (categoryColors[e.category] || '#94a3b8') + '20' }}>
                              <CatIcon size={12} style={{ color: categoryColors[e.category] || '#94a3b8' }} />
                            </div>
                            <span className="text-sm font-medium">{e.category}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">{e.description}</TableCell>
                        <TableCell className="font-semibold text-sm">₹{e.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{e.date}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{e.approvedBy || '—'}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                            <StatusIcon size={10} />
                            {e.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="px-4 py-2 border-t border-border bg-muted/20 flex justify-between text-xs text-muted-foreground">
              <span>{filtered.length} expenses</span>
              <span>Total: ₹{filtered.reduce((s, e) => s + e.amount, 0).toLocaleString('en-IN')}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Expense Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Add Expense</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={newExpense.category} onValueChange={(v) => setNewExpense({ ...newExpense, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['Diesel', 'Salary', 'Courier', 'Rent', 'Electricity', 'Packaging', 'Marketing'].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Input value={newExpense.description} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} placeholder="Expense description" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Amount (₹)</Label>
                <Input type="number" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} placeholder="0" />
              </div>
              <div className="space-y-1.5">
                <Label>Date</Label>
                <Input type="date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Expense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
