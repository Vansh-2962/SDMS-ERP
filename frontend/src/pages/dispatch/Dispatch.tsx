import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import {
  IconTruckDelivery, IconPackage, IconCircleCheck, IconClock,
  IconSearch, IconPlus, IconEye, IconMapPin, IconCalendarEvent,
  IconAlertTriangle, IconQrcode,
} from '@tabler/icons-react';

const dispatches = [
  {
    id: 'DISP-001', orderId: 'SO-2024-001', customer: 'Ravi Distributors', driver: 'Ramesh Kumar',
    vehicle: 'KA-01-AB-1234', items: 3, weight: '42 kg', date: '2024-03-20',
    status: 'Delivered', eta: '2024-03-20', deliveredAt: '2024-03-20 14:30',
    address: '12, Market Road, Bangalore', distance: '18 km',
  },
  {
    id: 'DISP-002', orderId: 'SO-2024-002', customer: 'Metro Supermarket', driver: 'Suresh Yadav',
    vehicle: 'KA-01-CD-5678', items: 2, weight: '28 kg', date: '2024-03-21',
    status: 'In Transit', eta: '2024-03-21', deliveredAt: '',
    address: '45, MG Road, Bangalore', distance: '12 km',
  },
  {
    id: 'DISP-003', orderId: 'SO-2024-004', customer: 'North India Traders', driver: 'Mahesh Singh',
    vehicle: 'DL-01-EF-9012', items: 5, weight: '85 kg', date: '2024-03-22',
    status: 'Pending', eta: '2024-03-23', deliveredAt: '',
    address: '23, Nehru Place, Delhi', distance: '12 km',
  },
  {
    id: 'DISP-004', orderId: 'SO-2024-003', customer: 'Spice Mart Retail', driver: 'Kiran Patel',
    vehicle: 'GJ-01-GH-3456', items: 1, weight: '9 kg', date: '2024-03-22',
    status: 'Packed', eta: '2024-03-23', deliveredAt: '',
    address: '8, Gandhi Nagar, Ahmedabad', distance: '8 km',
  },
];

const drivers = [
  { id: 'DRV001', name: 'Ramesh Kumar', mobile: '9876540001', vehicle: 'KA-01-AB-1234', status: 'Available', trips: 12 },
  { id: 'DRV002', name: 'Suresh Yadav', mobile: '9876540002', vehicle: 'KA-01-CD-5678', status: 'On Route', trips: 8 },
  { id: 'DRV003', name: 'Mahesh Singh', mobile: '9876540003', vehicle: 'DL-01-EF-9012', status: 'Available', trips: 15 },
  { id: 'DRV004', name: 'Kiran Patel', mobile: '9876540004', vehicle: 'GJ-01-GH-3456', status: 'Available', trips: 6 },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  Delivered:  { color: 'text-emerald-700', bg: 'bg-emerald-100' },
  'In Transit': { color: 'text-blue-700', bg: 'bg-blue-100' },
  Packed:     { color: 'text-amber-700', bg: 'bg-amber-100' },
  Pending:    { color: 'text-gray-700', bg: 'bg-gray-100' },
  Cancelled:  { color: 'text-red-700', bg: 'bg-red-100' },
};

export default function Dispatch() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewDispatch, setViewDispatch] = useState<typeof dispatches[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const filtered = dispatches.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = d.customer.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.orderId.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const delivered  = dispatches.filter((d) => d.status === 'Delivered').length;
  const inTransit  = dispatches.filter((d) => d.status === 'In Transit').length;
  const pending    = dispatches.filter((d) => d.status === 'Pending' || d.status === 'Packed').length;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Dispatches', value: dispatches.length, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconTruckDelivery },
          { label: 'Delivered', value: delivered, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconCircleCheck },
          { label: 'In Transit', value: inTransit, bg: 'bg-blue-50', color: 'text-blue-600', icon: IconTruckDelivery },
          { label: 'Pending', value: pending, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconClock },
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

      <Tabs defaultValue="dispatches">
        <div className="flex items-center justify-between gap-3 mb-3">
          <TabsList className="bg-muted/60 p-1">
            <TabsTrigger value="dispatches" className="text-xs">Dispatch List</TabsTrigger>
            <TabsTrigger value="drivers" className="text-xs">Drivers & Vehicles</TabsTrigger>
          </TabsList>
          <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
            <IconPlus size={15} /> Create Dispatch
          </Button>
        </div>

        {/* Dispatch List */}
        <TabsContent value="dispatches" className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search dispatch ID, customer, order..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                {['All', 'Pending', 'Packed', 'In Transit', 'Delivered', 'Cancelled'].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dispatch Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((d) => {
              const sc = statusConfig[d.status] || statusConfig['Pending'];
              return (
                <Card key={d.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-mono text-xs text-muted-foreground">{d.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.color}`}>
                            {d.status}
                          </span>
                        </div>
                        <p className="font-heading font-semibold text-sm text-foreground">{d.customer}</p>
                        <p className="text-xs text-muted-foreground">Order: {d.orderId}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => setViewDispatch(d)}>
                        <IconEye size={14} />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <IconTruckDelivery size={13} />
                        <span>{d.driver} · {d.vehicle}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <IconPackage size={13} />
                        <span>{d.items} items · {d.weight}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <IconCalendarEvent size={13} />
                        <span>ETA: {d.eta}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <IconMapPin size={13} />
                        <span>{d.distance}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-muted/50 text-xs text-muted-foreground mb-3 flex items-center gap-1.5">
                      <IconMapPin size={12} />
                      {d.address}
                    </div>

                    {d.status === 'In Transit' && (
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 h-7 text-xs bg-emerald-600 hover:bg-emerald-700">
                          <IconCircleCheck size={12} className="mr-1" /> Mark Delivered
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <IconMapPin size={12} className="mr-1" /> Track
                        </Button>
                      </div>
                    )}
                    {d.status === 'Packed' && (
                      <Button size="sm" className="w-full h-7 text-xs">
                        <IconTruckDelivery size={12} className="mr-1" /> Dispatch Now
                      </Button>
                    )}
                    {d.status === 'Delivered' && d.deliveredAt && (
                      <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                        <IconCircleCheck size={12} /> Delivered at {d.deliveredAt}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Drivers */}
        <TabsContent value="drivers">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold">Drivers & Vehicles</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Driver ID', 'Name', 'Mobile', 'Vehicle', 'Status', 'Total Trips'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drivers.map((drv) => (
                    <TableRow key={drv.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs">{drv.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {drv.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="font-medium text-sm">{drv.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{drv.mobile}</TableCell>
                      <TableCell className="font-mono text-xs">{drv.vehicle}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${drv.status === 'Available' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                          {drv.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-semibold text-sm">{drv.trips}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Dialog */}
      {viewDispatch && (
        <Dialog open={!!viewDispatch} onOpenChange={() => setViewDispatch(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading">Dispatch Details — {viewDispatch.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Order ID', value: viewDispatch.orderId },
                  { label: 'Customer', value: viewDispatch.customer },
                  { label: 'Driver', value: viewDispatch.driver },
                  { label: 'Vehicle', value: viewDispatch.vehicle },
                  { label: 'Items', value: `${viewDispatch.items} items` },
                  { label: 'Weight', value: viewDispatch.weight },
                  { label: 'Dispatch Date', value: viewDispatch.date },
                  { label: 'ETA', value: viewDispatch.eta },
                  { label: 'Distance', value: viewDispatch.distance },
                  { label: 'Status', value: viewDispatch.status },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Delivery Address</p>
                <p className="text-sm font-medium">{viewDispatch.address}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Create Dispatch</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { label: 'Order ID', placeholder: 'SO-2024-XXX' },
              { label: 'Customer', placeholder: 'Customer name' },
              { label: 'Driver', placeholder: 'Driver name' },
              { label: 'Vehicle No.', placeholder: 'KA-01-XX-XXXX' },
              { label: 'Dispatch Date', type: 'date' },
              { label: 'ETA Date', type: 'date' },
            ].map(({ label, placeholder, type }) => (
              <div key={label} className="space-y-1.5">
                <Label className="text-xs">{label}</Label>
                <Input type={type || 'text'} placeholder={placeholder} className="h-8 text-sm" />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Create Dispatch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
