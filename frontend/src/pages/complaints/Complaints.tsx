import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import {
  IconMessageCircle, IconPlus, IconSearch, IconEye, IconCircleCheck,
  IconAlertTriangle, IconClock, IconCamera,
} from '@tabler/icons-react';

const priorityConfig: Record<string, string> = {
  High:   'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low:    'bg-blue-100 text-blue-700',
};

const statusConfig: Record<string, string> = {
  Open:        'bg-red-100 text-red-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  Resolved:    'bg-emerald-100 text-emerald-700',
};

export default function Complaints() {
  const { complaints, updateComplaintStatus } = useAppStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewComp, setViewComp] = useState<typeof complaints[0] | null>(null);
  const [resolution, setResolution] = useState('');
  const [addOpen, setAddOpen] = useState(false);

  const filtered = complaints.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = c.customerName.toLowerCase().includes(q) || c.product.toLowerCase().includes(q) || c.batchNo.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const open       = complaints.filter((c) => c.status === 'Open').length;
  const inProgress = complaints.filter((c) => c.status === 'In Progress').length;
  const resolved   = complaints.filter((c) => c.status === 'Resolved').length;

  const handleResolve = () => {
    if (viewComp) {
      updateComplaintStatus(viewComp.id, 'Resolved', resolution);
      setViewComp(null);
      setResolution('');
    }
  };

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Complaints', value: complaints.length, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconMessageCircle },
          { label: 'Open',        value: open,       bg: 'bg-red-50',     color: 'text-red-600',     icon: IconAlertTriangle },
          { label: 'In Progress', value: inProgress, bg: 'bg-amber-50',   color: 'text-amber-600',   icon: IconClock },
          { label: 'Resolved',    value: resolved,   bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconCircleCheck },
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

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by customer, product, batch..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            {['All', 'Open', 'In Progress', 'Resolved'].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
          <IconPlus size={15} /> New Complaint
        </Button>
      </div>

      {/* Cards View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <Card key={c.id} className={`border shadow-sm hover:shadow-md transition-shadow ${c.status === 'Open' ? 'border-red-200' : c.status === 'In Progress' ? 'border-amber-200' : 'border-border'}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{c.id}</p>
                  <p className="font-heading font-semibold text-sm text-foreground mt-0.5">{c.customerName}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig[c.priority] || 'bg-gray-100 text-gray-600'}`}>
                    {c.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[c.status] || 'bg-gray-100 text-gray-600'}`}>
                    {c.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product</span>
                  <span className="font-medium text-foreground truncate ml-2 text-right">{c.product}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Batch No.</span>
                  <span className="font-mono font-medium">{c.batchNo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{c.date}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/50 mb-3">
                <p className="text-xs text-muted-foreground mb-1">Complaint</p>
                <p className="text-sm">{c.complaint}</p>
              </div>

              {c.resolution && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100 mb-3">
                  <p className="text-xs text-emerald-700 font-semibold mb-1">Resolution</p>
                  <p className="text-xs text-emerald-800">{c.resolution}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs gap-1" onClick={() => { setViewComp(c); setResolution(c.resolution); }}>
                  <IconEye size={12} /> View / Resolve
                </Button>
                <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-muted-foreground">
                  <IconCamera size={12} /> Photos
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">No complaints found.</div>
        )}
      </div>

      {/* Resolve Dialog */}
      {viewComp && (
        <Dialog open={!!viewComp} onOpenChange={() => setViewComp(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">Complaint — {viewComp.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Customer', value: viewComp.customerName },
                  { label: 'Date', value: viewComp.date },
                  { label: 'Product', value: viewComp.product },
                  { label: 'Batch No.', value: viewComp.batchNo },
                  { label: 'Priority', value: viewComp.priority },
                  { label: 'Status', value: viewComp.status },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Complaint Details</p>
                <p className="text-sm">{viewComp.complaint}</p>
              </div>
              <div className="space-y-1.5">
                <Label>Resolution / Action Taken</Label>
                <Textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  placeholder="Describe the resolution or action taken..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewComp(null)}>Cancel</Button>
              {viewComp.status !== 'Resolved' && (
                <Button onClick={handleResolve} className="gap-1.5">
                  <IconCircleCheck size={15} /> Mark Resolved
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Complaint Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Log New Complaint</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { label: 'Customer Name', placeholder: 'Customer name' },
              { label: 'Product', placeholder: 'Product name' },
              { label: 'Batch Number', placeholder: 'B2024XXX' },
              { label: 'Date', placeholder: '', type: 'date' },
            ].map(({ label, placeholder, type }) => (
              <div key={label} className="space-y-1.5">
                <Label className="text-xs">{label}</Label>
                <Input type={type || 'text'} placeholder={placeholder} className="h-8 text-sm" />
              </div>
            ))}
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs">Complaint Description</Label>
              <Textarea placeholder="Describe the complaint in detail..." rows={3} />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs">Priority</Label>
              <Select defaultValue="Medium">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {['High', 'Medium', 'Low'].map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Submit Complaint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
