import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import {
  IconBuildingWarehouse, IconAlertTriangle, IconPlus, IconSearch,
  IconAdjustments, IconPackage,
} from '@tabler/icons-react';

const statusBadge: Record<string, string> = {
  Adequate: 'bg-emerald-100 text-emerald-700',
  Low: 'bg-amber-100 text-amber-700',
  'Out of Stock': 'bg-red-100 text-red-700',
};

function StockProgress({ current, reorder }: { current: number; reorder: number }) {
  const max = reorder * 4;
  const pct = Math.min(100, (current / max) * 100);
  const color = current === 0 ? 'bg-red-500' : current <= reorder ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className="space-y-0.5">
      <div className="text-xs font-medium text-foreground">{current.toLocaleString('en-IN')}</div>
      <div className="w-28 h-1.5 bg-muted rounded-full">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function InventoryList() {
  const { inventory } = useAppStore();
  const [search, setSearch] = useState('');
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjustItem, setAdjustItem] = useState<typeof inventory[0] | null>(null);
  const [adjustQty, setAdjustQty] = useState('');
  const [adjustType, setAdjustType] = useState('add');

  const lowItems = inventory.filter((i) => i.status === 'Low');
  const totalValue = inventory.filter((i) => i.type === 'Finished Goods').reduce((s, i) => s + i.currentStock * i.purchasePrice, 0);

  const filterItems = (type: string) => {
    return inventory.filter((i) => {
      const matchType = type === 'all' || i.type === type;
      const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.id.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  };

  function InventoryTable({ items }: { items: typeof inventory }) {
    return (
      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              {['Item ID', 'Type', 'Name', 'Unit', 'Current Stock', 'Reorder Level', 'Status', 'Last Purchase', 'Supplier', 'Purchase Price', 'Actions'].map((h) => (
                <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10 text-muted-foreground">No items found.</TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className={`hover:bg-muted/30 ${item.status === 'Low' ? 'bg-amber-50/30' : ''}`}>
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'Raw Material' ? 'bg-blue-100 text-blue-700' :
                      item.type === 'Packaging Material' ? 'bg-violet-100 text-violet-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {item.type === 'Finished Goods' ? 'FG' : item.type === 'Raw Material' ? 'RM' : 'PM'}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-sm">{item.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.unit}</TableCell>
                  <TableCell><StockProgress current={item.currentStock} reorder={item.reorderLevel} /></TableCell>
                  <TableCell className="text-sm">{item.reorderLevel.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[item.status] || 'bg-gray-100 text-gray-600'}`}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.lastPurchaseDate}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{item.supplier}</TableCell>
                  <TableCell className="text-sm font-medium">₹{item.purchasePrice}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="h-7 text-xs gap-1"
                      onClick={() => { setAdjustItem(item); setAdjustOpen(true); }}>
                      <IconAdjustments size={12} /> Adjust
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total SKUs', value: inventory.length, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconPackage },
          { label: 'Low Stock Items', value: lowItems.length, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconAlertTriangle },
          { label: 'Out of Stock', value: 0, bg: 'bg-red-50', color: 'text-red-600', icon: IconAlertTriangle },
          { label: 'FG Value', value: `₹${(totalValue / 1000).toFixed(0)}k`, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconBuildingWarehouse },
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

      {/* Low Stock Alert Banner */}
      {lowItems.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
          <IconAlertTriangle size={18} className="text-amber-600 flex-shrink-0" />
          <p className="text-sm font-medium text-amber-800">
            {lowItems.length} item{lowItems.length > 1 ? 's' : ''} below reorder level:{' '}
            {lowItems.map((i) => i.name).join(', ')}
          </p>
        </div>
      )}

      {/* Search + Add */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Button className="h-9 gap-1.5"><IconPlus size={15} /> Add Item</Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="bg-muted/60 p-1 gap-1">
          <TabsTrigger value="all" className="text-xs">All Items</TabsTrigger>
          <TabsTrigger value="Raw Material" className="text-xs">Raw Material</TabsTrigger>
          <TabsTrigger value="Packaging Material" className="text-xs">Packaging</TabsTrigger>
          <TabsTrigger value="Finished Goods" className="text-xs">Finished Goods</TabsTrigger>
        </TabsList>
        {['all', 'Raw Material', 'Packaging Material', 'Finished Goods'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <InventoryTable items={filterItems(tab)} />
          </TabsContent>
        ))}
      </Tabs>

      {/* Adjust Stock Dialog */}
      <Dialog open={adjustOpen} onOpenChange={setAdjustOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Adjust Stock — {adjustItem?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="p-3 rounded-lg bg-muted/50 text-sm">
              <span className="text-muted-foreground">Current Stock: </span>
              <strong>{adjustItem?.currentStock.toLocaleString('en-IN')} {adjustItem?.unit}</strong>
            </div>
            <div className="space-y-1.5">
              <Label>Adjustment Type</Label>
              <Select value={adjustType} onValueChange={setAdjustType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Add Stock (+)</SelectItem>
                  <SelectItem value="remove">Remove Stock (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Quantity ({adjustItem?.unit})</Label>
              <Input type="number" min={1} value={adjustQty} onChange={(e) => setAdjustQty(e.target.value)} placeholder="Enter quantity" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustOpen(false)}>Cancel</Button>
            <Button onClick={() => setAdjustOpen(false)}>Apply Adjustment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
