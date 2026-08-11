import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Progress } from '../../components/ui/progress';
import {
  IconFlask, IconPlus, IconEye, IconClock, IconCircleCheck,
  IconLoader, IconAlertTriangle, IconPackage, IconTrendingUp,
} from '@tabler/icons-react';

const statusConfig: Record<string, { color: string; icon: any }> = {
  'Completed':   { color: 'bg-emerald-100 text-emerald-700', icon: IconCircleCheck },
  'In Progress': { color: 'bg-blue-100 text-blue-700',       icon: IconLoader },
  'Planned':     { color: 'bg-amber-100 text-amber-700',     icon: IconClock },
  'On Hold':     { color: 'bg-red-100 text-red-700',         icon: IconAlertTriangle },
};

export default function Manufacturing() {
  const { manufacturing } = useAppStore();
  const [addOpen, setAddOpen] = useState(false);
  const [viewBatch, setViewBatch] = useState<typeof manufacturing[0] | null>(null);

  const completed  = manufacturing.filter((m) => m.status === 'Completed').length;
  const inProgress = manufacturing.filter((m) => m.status === 'In Progress').length;
  const totalProduced = manufacturing.filter((m) => m.status === 'Completed').reduce((s, m) => s + m.producedQty, 0);
  const totalCost     = manufacturing.reduce((s, m) => s + m.batchCost, 0);

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Batches', value: manufacturing.length, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconFlask },
          { label: 'Completed',     value: completed,            bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconCircleCheck },
          { label: 'In Progress',   value: inProgress,           bg: 'bg-blue-50',   color: 'text-blue-600',    icon: IconLoader },
          { label: 'Total Produced', value: `${totalProduced.toLocaleString('en-IN')} pcs`, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconPackage },
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

      <div className="flex items-center justify-end">
        <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
          <IconPlus size={15} /> New Production Batch
        </Button>
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {manufacturing.map((batch) => {
          const sc = statusConfig[batch.status] || statusConfig['Planned'];
          const StatusIcon = sc.icon;
          const yieldPct = batch.producedQty > 0 ? batch.yieldPercent : 0;
          const progressPct = batch.status === 'Completed' ? 100 : batch.status === 'In Progress' ? 55 : 0;
          return (
            <Card key={batch.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-heading font-bold text-sm text-foreground">{batch.product}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                        <StatusIcon size={11} />
                        {batch.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">Batch: {batch.batchNo}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => setViewBatch(batch)}>
                    <IconEye size={14} />
                  </Button>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Production Progress</span>
                    <span>{progressPct}%</span>
                  </div>
                  <Progress value={progressPct} className="h-2" />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Planned', value: batch.plannedQty.toLocaleString('en-IN'), sub: 'pcs' },
                    { label: 'Produced', value: batch.producedQty.toLocaleString('en-IN'), sub: 'pcs' },
                    { label: 'Wastage', value: batch.wastage, sub: 'pcs' },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="p-2.5 rounded-xl bg-muted/50 text-center">
                      <p className="font-heading font-bold text-base text-foreground">{value}</p>
                      <p className="text-[10px] text-muted-foreground">{label} ({sub})</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Raw Material</span>
                    <span className="font-medium text-foreground">{batch.rawMaterial}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Batch Cost</span>
                    <span className="font-semibold text-primary">₹{batch.batchCost.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Yield %</span>
                    <span className={`font-semibold ${yieldPct >= 95 ? 'text-emerald-600' : yieldPct > 0 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {yieldPct > 0 ? `${yieldPct}%` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="text-foreground">{batch.startDate} {batch.endDate !== '-' ? `→ ${batch.endDate}` : '→ ongoing'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Table */}
      <Card className="border border-border shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
            <IconTrendingUp size={16} className="text-primary" /> Batch Summary
          </CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {['Batch No.', 'Product', 'Planned', 'Produced', 'Wastage', 'Yield %', 'Batch Cost', 'Packing', 'Start Date', 'Status'].map((h) => (
                  <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {manufacturing.map((batch) => {
                const sc = statusConfig[batch.status] || statusConfig['Planned'];
                const StatusIcon = sc.icon;
                return (
                  <TableRow key={batch.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-xs font-medium text-primary">{batch.batchNo}</TableCell>
                    <TableCell className="font-medium text-sm">{batch.product}</TableCell>
                    <TableCell className="text-sm">{batch.plannedQty.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-sm font-medium">{batch.producedQty > 0 ? batch.producedQty.toLocaleString('en-IN') : '—'}</TableCell>
                    <TableCell className={`text-sm ${batch.wastage > 50 ? 'text-amber-600 font-medium' : 'text-muted-foreground'}`}>{batch.wastage}</TableCell>
                    <TableCell className={`text-sm font-medium ${batch.yieldPercent >= 95 ? 'text-emerald-600' : batch.yieldPercent > 0 ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {batch.yieldPercent > 0 ? `${batch.yieldPercent}%` : '—'}
                    </TableCell>
                    <TableCell className="font-semibold text-sm">
                      {batch.batchCost > 0 ? `₹${batch.batchCost.toLocaleString('en-IN')}` : '—'}
                    </TableCell>
                    <TableCell className="text-sm">{batch.packagingUsed > 0 ? batch.packagingUsed.toLocaleString('en-IN') : '—'}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{batch.startDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.color}`}>
                        <StatusIcon size={11} />
                        {batch.status}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-2 border-t border-border bg-muted/20 flex items-center justify-between text-xs text-muted-foreground">
          <span>Total Batches: {manufacturing.length}</span>
          <span>Total Cost: ₹{totalCost.toLocaleString('en-IN')}</span>
        </div>
      </Card>

      {/* Batch Detail Dialog */}
      {viewBatch && (
        <Dialog open={!!viewBatch} onOpenChange={() => setViewBatch(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">Batch Details — {viewBatch.batchNo}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Product', value: viewBatch.product },
                  { label: 'Status', value: viewBatch.status },
                  { label: 'Planned Qty', value: `${viewBatch.plannedQty} pcs` },
                  { label: 'Produced Qty', value: `${viewBatch.producedQty} pcs` },
                  { label: 'Wastage', value: `${viewBatch.wastage} pcs` },
                  { label: 'Yield %', value: viewBatch.yieldPercent > 0 ? `${viewBatch.yieldPercent}%` : 'N/A' },
                  { label: 'Batch Cost', value: viewBatch.batchCost > 0 ? `₹${viewBatch.batchCost.toLocaleString('en-IN')}` : 'N/A' },
                  { label: 'Packaging Used', value: `${viewBatch.packagingUsed} pcs` },
                  { label: 'Start Date', value: viewBatch.startDate },
                  { label: 'End Date', value: viewBatch.endDate !== '-' ? viewBatch.endDate : 'Ongoing' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Raw Material Consumption</p>
                <p className="font-medium text-sm">{viewBatch.rawMaterial}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Batch Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">Create Production Batch</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { label: 'Batch Number', placeholder: 'B2024-XXXX' },
              { label: 'Product', placeholder: 'Product name' },
              { label: 'Planned Quantity', placeholder: 'e.g. 2000' },
              { label: 'Start Date', placeholder: '', type: 'date' },
              { label: 'Raw Material', placeholder: 'Raw material details' },
              { label: 'Packaging Required', placeholder: 'e.g. 2000 pcs' },
            ].map(({ label, placeholder, type }) => (
              <div key={label} className="space-y-1.5">
                <Label className="text-xs">{label}</Label>
                <Input type={type || 'text'} placeholder={placeholder} className="h-8 text-sm" />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Create Batch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
