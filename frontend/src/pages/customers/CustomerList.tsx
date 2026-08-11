import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '../../components/ui/table';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import {
  IconUsers, IconBuildingStore, IconPlus, IconSearch,
  IconEdit, IconTrash, IconBuildingWarehouse, IconTruckDelivery,
  IconShoppingBag, IconPhone, IconMapPin,
} from '@tabler/icons-react';

const typeConfig: Record<string, { color: string; bg: string }> = {
  Distributor: { color: 'text-violet-700', bg: 'bg-violet-100' },
  'Super Stockist': { color: 'text-blue-700', bg: 'bg-blue-100' },
  Retailer: { color: 'text-emerald-700', bg: 'bg-emerald-100' },
  Wholesaler: { color: 'text-amber-700', bg: 'bg-amber-100' },
  'Modern Trade': { color: 'text-rose-700', bg: 'bg-rose-100' },
};

export default function CustomerList() {
  const navigate = useNavigate();
  const { customers, deleteCustomer } = useAppStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.shopName.toLowerCase().includes(search.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search);
    const matchType = typeFilter === 'All' || c.type === typeFilter;
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const typeCounts = customers.reduce<Record<string, number>>((acc, c) => {
    acc[c.type] = (acc[c.type] || 0) + 1;
    return acc;
  }, {});

  const summaryCards = [
    { label: 'Distributors', count: typeCounts['Distributor'] || 0, icon: IconTruckDelivery, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Super Stockists', count: typeCounts['Super Stockist'] || 0, icon: IconBuildingWarehouse, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Retailers', count: typeCounts['Retailer'] || 0, icon: IconBuildingStore, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Wholesalers', count: typeCounts['Wholesaler'] || 0, icon: IconShoppingBag, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Modern Trade', count: typeCounts['Modern Trade'] || 0, icon: IconUsers, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-5">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {summaryCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border border-border shadow-sm">
              <CardContent className={`p-4 ${s.bg}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-heading font-bold text-foreground">{s.count}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                  <Icon size={22} className={s.color} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-44 h-9">
            <SelectValue placeholder="Customer Type" />
          </SelectTrigger>
          <SelectContent>
            {['All', 'Distributor', 'Super Stockist', 'Retailer', 'Wholesaler', 'Modern Trade'].map((t) => (
              <SelectItem key={t} value={t}>{t}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32 h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => navigate('/customers/new')} className="h-9 gap-1.5">
          <IconPlus size={15} />
          Add Customer
        </Button>
      </div>

      {/* Table */}
      <Card className="border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {['Customer ID', 'Shop / Owner', 'Type', 'Territory', 'Salesman', 'Contact', 'Credit Limit', 'Status', 'Actions'].map((h) => (
                  <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                    No customers found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => {
                  const tc = typeConfig[c.type] || { color: 'text-gray-700', bg: 'bg-gray-100' };
                  return (
                    <TableRow key={c.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs text-muted-foreground">{c.id}</TableCell>
                      <TableCell>
                        <p className="font-medium text-sm text-foreground">{c.shopName}</p>
                        <p className="text-xs text-muted-foreground">{c.ownerName}</p>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tc.bg} ${tc.color}`}>
                          {c.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <IconMapPin size={11} />
                          {c.territory}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-foreground">{c.salesman}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <IconPhone size={11} />
                          {c.mobile}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        ₹{c.creditLimit.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={c.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs'}
                        >
                          {c.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-primary"
                            onClick={() => navigate(`/customers/${c.id}/edit`)}
                          >
                            <IconEdit size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => setDeleteId(c.id)}
                          >
                            <IconTrash size={14} />
                          </Button>
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
          Showing {filtered.length} of {customers.length} customers
        </div>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Customer</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this customer. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => { if (deleteId) deleteCustomer(deleteId); setDeleteId(null); }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
