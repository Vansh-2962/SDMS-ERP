import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Progress } from '../../components/ui/progress';
import {
  IconUsers, IconPlus, IconEdit, IconCurrencyRupee, IconCalendarEvent,
  IconFileText, IconUserCheck, IconSearch, IconBriefcase,
} from '@tabler/icons-react';

const departmentColors: Record<string, string> = {
  Sales: 'bg-violet-100 text-violet-700',
  Finance: 'bg-blue-100 text-blue-700',
  Operations: 'bg-amber-100 text-amber-700',
  Manufacturing: 'bg-emerald-100 text-emerald-700',
};

const attendanceColor: Record<string, string> = {
  Present: 'bg-emerald-100 text-emerald-700',
  Absent: 'bg-red-100 text-red-700',
  Leave: 'bg-amber-100 text-amber-700',
};

const leaveData = [
  { name: 'Arjun Singh', type: 'Sick Leave', from: '2024-03-20', to: '2024-03-21', days: 2, status: 'Approved' },
  { name: 'Kavitha Menon', type: 'Annual Leave', from: '2024-03-25', to: '2024-03-29', days: 5, status: 'Pending' },
];

const expenseClaimsData = [
  { name: 'Arjun Singh', category: 'Travel', amount: 2400, date: '2024-03-18', status: 'Approved' },
  { name: 'Vikas Gupta', category: 'Accommodation', amount: 3500, date: '2024-03-15', status: 'Pending' },
];

export default function Employees() {
  const { employees } = useAppStore();
  const [search, setSearch] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [viewEmp, setViewEmp] = useState<typeof employees[0] | null>(null);

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase())
  );

  const totalSalary = employees.reduce((s, e) => s + e.salary, 0);
  const present = employees.filter((e) => e.attendance === 'Present').length;
  const absent = employees.filter((e) => e.attendance === 'Absent').length;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Employees', value: employees.length, bg: 'bg-violet-50', color: 'text-violet-600', icon: IconUsers },
          { label: 'Present Today', value: present, bg: 'bg-emerald-50', color: 'text-emerald-600', icon: IconUserCheck },
          { label: 'Absent Today', value: absent, bg: 'bg-red-50', color: 'text-red-600', icon: IconBriefcase },
          { label: 'Monthly Payroll', value: `₹${(totalSalary / 1000).toFixed(0)}k`, bg: 'bg-amber-50', color: 'text-amber-600', icon: IconCurrencyRupee },
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

      <Tabs defaultValue="directory">
        <div className="flex items-center justify-between gap-3 mb-4">
          <TabsList className="bg-muted/60 p-1">
            <TabsTrigger value="directory" className="text-xs">Employee Directory</TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs">Attendance</TabsTrigger>
            <TabsTrigger value="leaves" className="text-xs">Leave Requests</TabsTrigger>
            <TabsTrigger value="expenses" className="text-xs">Expense Claims</TabsTrigger>
          </TabsList>
          <Button className="h-9 gap-1.5" onClick={() => setAddOpen(true)}>
            <IconPlus size={15} /> Add Employee
          </Button>
        </div>

        {/* Employee Directory */}
        <TabsContent value="directory" className="space-y-4">
          <div className="relative">
            <IconSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 max-w-sm" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((emp) => {
              const initials = emp.name.split(' ').map((n) => n[0]).join('').toUpperCase();
              return (
                <Card key={emp.id} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-heading font-bold text-lg flex-shrink-0">
                        {initials}
                      </div>
                      <div className="flex-1">
                        <p className="font-heading font-semibold text-sm text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.role}</p>
                        <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${departmentColors[emp.department] || 'bg-gray-100 text-gray-600'}`}>
                          {emp.department}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${attendanceColor[emp.attendance] || 'bg-gray-100'}`}>
                        {emp.attendance}
                      </span>
                    </div>
                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Employee ID</span>
                        <span className="font-mono font-medium">{emp.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mobile</span>
                        <span>{emp.mobile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Salary</span>
                        <span className="font-semibold text-emerald-700">₹{emp.salary.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Leaves Used</span>
                        <span>{emp.leaves} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Joined</span>
                        <span>{emp.joinDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-7 text-xs" onClick={() => setViewEmp(emp)}>
                        <IconEdit size={12} className="mr-1" /> Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
                        <IconFileText size={12} className="mr-1" /> Docs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Attendance */}
        <TabsContent value="attendance">
          <Card className="border border-border shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
                <IconCalendarEvent size={16} className="text-primary" /> Today's Attendance — {new Date().toDateString()}
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Employee', 'Dept', 'Role', 'Salary', 'Attendance', 'Leaves', 'Actions'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((emp) => (
                    <TableRow key={emp.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{emp.name}</p>
                            <p className="text-xs text-muted-foreground">{emp.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${departmentColors[emp.department] || 'bg-gray-100 text-gray-600'}`}>
                          {emp.department}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{emp.role}</TableCell>
                      <TableCell className="font-medium text-sm">₹{emp.salary.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${attendanceColor[emp.attendance] || 'bg-gray-100'}`}>
                          {emp.attendance}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{emp.leaves} days</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="h-7 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50">P</Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50">A</Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs text-amber-600 border-amber-200 hover:bg-amber-50">L</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Leave Requests */}
        <TabsContent value="leaves">
          <Card className="border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Employee', 'Leave Type', 'From', 'To', 'Days', 'Status', 'Actions'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveData.map((l, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-sm">{l.name}</TableCell>
                      <TableCell className="text-sm">{l.type}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{l.from}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{l.to}</TableCell>
                      <TableCell className="text-sm font-medium">{l.days}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${l.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {l.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {l.status === 'Pending' && (
                          <div className="flex gap-1">
                            <Button size="sm" className="h-7 text-xs">Approve</Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs text-destructive">Reject</Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Expense Claims */}
        <TabsContent value="expenses">
          <Card className="border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    {['Employee', 'Category', 'Amount', 'Date', 'Status', 'Actions'].map((h) => (
                      <TableHead key={h} className="text-xs font-semibold">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseClaimsData.map((ec, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell className="font-medium text-sm">{ec.name}</TableCell>
                      <TableCell className="text-sm">{ec.category}</TableCell>
                      <TableCell className="font-semibold text-sm">₹{ec.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{ec.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ec.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {ec.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        {ec.status === 'Pending' && (
                          <Button size="sm" className="h-7 text-xs">Approve</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Employee Detail/Edit Dialog */}
      {viewEmp && (
        <Dialog open={!!viewEmp} onOpenChange={() => setViewEmp(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading">Edit Employee — {viewEmp.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 py-2 text-sm">
              {[
                { label: 'Full Name', value: viewEmp.name },
                { label: 'Role', value: viewEmp.role },
                { label: 'Department', value: viewEmp.department },
                { label: 'Mobile', value: viewEmp.mobile },
                { label: 'PAN', value: viewEmp.pan },
                { label: 'Aadhaar', value: viewEmp.aadhaar },
                { label: 'Bank Account', value: viewEmp.bank },
                { label: 'Salary (₹)', value: String(viewEmp.salary) },
                { label: 'Join Date', value: viewEmp.joinDate },
                { label: 'Status', value: viewEmp.status },
              ].map(({ label, value }) => (
                <div key={label} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{label}</Label>
                  <Input defaultValue={value} className="h-8 text-xs" />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewEmp(null)}>Cancel</Button>
              <Button onClick={() => setViewEmp(null)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Employee Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading">Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            {['Full Name', 'Role', 'Department', 'Mobile', 'Email', 'PAN', 'Aadhaar', 'Bank Account', 'Salary (₹)', 'Join Date'].map((label) => (
              <div key={label} className="space-y-1">
                <Label className="text-xs">{label}</Label>
                <Input placeholder={label} className="h-8 text-xs" type={label === 'Salary (₹)' ? 'number' : label === 'Join Date' ? 'date' : 'text'} />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button onClick={() => setAddOpen(false)}>Add Employee</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
