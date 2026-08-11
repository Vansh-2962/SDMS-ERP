import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  IconUserCheck, IconMapPin, IconShoppingCart, IconCurrencyRupee,
  IconBuildingStore, IconPlus, IconEye, IconCircleFilled, IconCalendarEvent,
  IconClipboardList, IconCamera, IconUsers,
} from '@tabler/icons-react';

export default function SalesmanList() {
  const { salesmen } = useAppStore();
  const [selected, setSelected] = useState<typeof salesmen[0] | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const activeSalesmen = salesmen.filter((s) => s.status === 'Active');
  const totalVisits = salesmen.reduce((s, sm) => s + sm.todayVisits, 0);
  const totalOrders = salesmen.reduce((s, sm) => s + sm.ordersBooked, 0);
  const totalCollection = salesmen.reduce((s, sm) => s + sm.collectionToday, 0);

  const summaryCards = [
    { label: 'Total Salesmen', value: salesmen.length, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconUsers },
    { label: 'Active Today', value: activeSalesmen.length, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconUserCheck },
    { label: 'Total Visits', value: totalVisits, bg: 'bg-blue-50', color: 'text-blue-600', icon: IconBuildingStore },
    { label: "Today's Collection", value: `₹${(totalCollection / 1000).toFixed(0)}k`, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconCurrencyRupee },
  ];

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
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

      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-base text-foreground">Field Sales Team</h3>
        <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
          <IconPlus size={15} /> Add Salesman
        </Button>
      </div>

      {/* Salesman Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {salesmen.map((sm) => {
          const initials = sm.name.split(' ').map((n) => n[0]).join('').toUpperCase();
          return (
            <Card key={sm.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-lg">
                        {initials}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${sm.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm text-foreground">{sm.name}</p>
                      <p className="text-xs text-muted-foreground">{sm.loginId}</p>
                    </div>
                  </div>
                  {sm.status === 'Active' && (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100">
                      <IconCircleFilled size={7} className="text-emerald-600 animate-pulse-slow" />
                      <span className="text-[10px] font-semibold text-emerald-700">LIVE</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <IconMapPin size={12} className="text-primary" />
                  <span>{sm.territory}</span>
                  <span className="text-border">·</span>
                  <span>{sm.assignedCustomers} customers</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Visits', value: sm.todayVisits, color: 'text-blue-600 bg-blue-50' },
                    { label: 'Orders', value: sm.ordersBooked, color: 'text-violet-600 bg-violet-50' },
                    { label: 'Pending', value: sm.pendingVisits, color: sm.pendingVisits > 4 ? 'text-red-600 bg-red-50' : 'text-amber-600 bg-amber-50' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className={`rounded-xl p-2 text-center ${color.split(' ')[1]}`}>
                      <p className={`text-xl font-heading font-bold ${color.split(' ')[0]}`}>{value}</p>
                      <p className="text-[10px] text-muted-foreground">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground">Collection Today</span>
                  <span className="font-semibold text-sm text-emerald-700">₹{sm.collectionToday.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>Last seen: {sm.lastSeen}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1" onClick={() => setSelected(sm)}>
                    <IconEye size={13} /> Details
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 h-8 text-xs gap-1">
                    <IconMapPin size={13} /> Track
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activity Table */}
      <Card className="border border-border shadow-sm overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="font-heading text-base font-semibold">Today's Activity Summary</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                {['Salesman', 'Territory', 'Visits Done', 'Pending', 'Orders Booked', 'Collection', 'Status', 'Last Seen'].map((h) => (
                  <TableHead key={h} className="text-xs font-semibold whitespace-nowrap">{h}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesmen.map((sm) => (
                <TableRow key={sm.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {sm.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium">{sm.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{sm.territory}</TableCell>
                  <TableCell className="text-center font-medium">{sm.todayVisits}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${sm.pendingVisits > 4 ? 'text-red-600' : 'text-amber-600'}`}>{sm.pendingVisits}</span>
                  </TableCell>
                  <TableCell className="text-center font-medium text-primary">{sm.ordersBooked}</TableCell>
                  <TableCell className="font-semibold text-emerald-700">₹{sm.collectionToday.toLocaleString('en-IN')}</TableCell>
                  <TableCell>
                    <Badge className={sm.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs' : 'bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs'}>
                      {sm.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{sm.lastSeen}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Salesman Detail Dialog */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-heading">{selected.name} — Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: 'Login ID', value: selected.loginId },
                  { label: 'Mobile', value: selected.mobile },
                  { label: 'Email', value: selected.email },
                  { label: 'Territory', value: selected.territory },
                  { label: 'Assigned Customers', value: selected.assignedCustomers },
                  { label: 'Status', value: selected.status },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Visits Plan', value: selected.todayVisits + selected.pendingVisits, icon: IconCalendarEvent, color: 'text-blue-600 bg-blue-50' },
                  { label: 'Orders Today', value: selected.ordersBooked, icon: IconClipboardList, color: 'text-violet-600 bg-violet-50' },
                  { label: 'Collection', value: `₹${(selected.collectionToday / 1000).toFixed(0)}k`, icon: IconCurrencyRupee, color: 'text-emerald-600 bg-emerald-50' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className={`p-3 rounded-xl ${color.split(' ')[1]} text-center`}>
                    <Icon size={20} className={`${color.split(' ')[0]} mx-auto mb-1`} />
                    <p className={`text-lg font-heading font-bold ${color.split(' ')[0]}`}>{value}</p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1.5"><IconCamera size={14} /> View Photos</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><IconMapPin size={14} /> GPS Route</Button>
                <Button variant="outline" size="sm" className="gap-1.5"><IconClipboardList size={14} /> Visit Log</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Salesman Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">Add New Salesman</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[
              { label: 'Full Name', placeholder: 'Salesman name' },
              { label: 'Mobile', placeholder: '10-digit number' },
              { label: 'Email', placeholder: 'email@company.com' },
              { label: 'Territory', placeholder: 'Sales territory' },
              { label: 'Login ID', placeholder: 'login.id' },
              { label: 'Password', placeholder: '••••••••' },
            ].map(({ label, placeholder }) => (
              <div key={label} className="space-y-1.5">
                <Label className="text-xs">{label}</Label>
                <Input placeholder={placeholder} type={label === 'Password' ? 'password' : 'text'} className="h-8 text-sm" />
              </div>
            ))}
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Add Salesman</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
