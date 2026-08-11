import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import {
  IconSettings, IconShield, IconUsers, IconBell, IconBuilding,
  IconCircleCheck, IconEdit, IconTrash, IconPlus, IconKey,
  IconBrandWhatsapp, IconMail, IconDeviceMobile,
} from '@tabler/icons-react';

const roles = [
  {
    id: 'owner', name: 'Owner', color: 'bg-violet-100 text-violet-700', users: 1,
    permissions: ['dashboard', 'customers', 'products', 'orders', 'billing', 'payments', 'salesmen', 'gps', 'visits', 'employees', 'inventory', 'manufacturing', 'expenses', 'complaints', 'reports', 'analytics', 'settings'],
  },
  {
    id: 'sales_manager', name: 'Sales Manager', color: 'bg-blue-100 text-blue-700', users: 1,
    permissions: ['dashboard', 'customers', 'products', 'orders', 'billing', 'payments', 'salesmen', 'gps', 'visits', 'complaints', 'reports', 'analytics'],
  },
  {
    id: 'accountant', name: 'Accountant', color: 'bg-emerald-100 text-emerald-700', users: 1,
    permissions: ['dashboard', 'billing', 'payments', 'expenses', 'reports'],
  },
  {
    id: 'salesman', name: 'Salesman', color: 'bg-amber-100 text-amber-700', users: 6,
    permissions: ['orders', 'visits', 'complaints', 'gps'],
  },
  {
    id: 'warehouse', name: 'Warehouse', color: 'bg-orange-100 text-orange-700', users: 2,
    permissions: ['inventory', 'orders', 'dispatch'],
  },
  {
    id: 'production', name: 'Production', color: 'bg-teal-100 text-teal-700', users: 2,
    permissions: ['manufacturing', 'inventory'],
  },
  {
    id: 'dispatch', name: 'Dispatch', color: 'bg-cyan-100 text-cyan-700', users: 2,
    permissions: ['orders', 'dispatch'],
  },
];

const allModules = [
  'dashboard', 'customers', 'products', 'orders', 'billing', 'payments',
  'salesmen', 'gps', 'visits', 'employees', 'inventory', 'manufacturing',
  'expenses', 'complaints', 'reports', 'analytics', 'settings', 'dispatch',
];

const users = [
  { id: 'USR001', name: 'Rajesh Nair', email: 'rajesh@goldspice.com', role: 'Owner', lastLogin: '2 hours ago', status: 'Active' },
  { id: 'USR002', name: 'Priya Nair', email: 'priya@goldspice.com', role: 'Accountant', lastLogin: '1 hour ago', status: 'Active' },
  { id: 'USR003', name: 'Arjun Singh', email: 'arjun@goldspice.com', role: 'Salesman', lastLogin: '30 min ago', status: 'Active' },
  { id: 'USR004', name: 'Rahul Mehta', email: 'rahul@goldspice.com', role: 'Salesman', lastLogin: '45 min ago', status: 'Active' },
  { id: 'USR005', name: 'Vikas Gupta', email: 'vikas@goldspice.com', role: 'Sales Manager', lastLogin: '3 hours ago', status: 'Active' },
  { id: 'USR006', name: 'Sanjay Rao', email: 'sanjay@goldspice.com', role: 'Salesman', lastLogin: '5 hours ago', status: 'Inactive' },
];

const automationSettings = [
  { key: 'wa_order_confirm', label: 'WhatsApp Order Confirmation', desc: 'Send order confirmation to customer on WhatsApp', enabled: true },
  { key: 'wa_invoice', label: 'WhatsApp Invoice', desc: 'Auto-send invoice on WhatsApp after billing', enabled: true },
  { key: 'payment_reminder', label: 'Payment Reminders', desc: 'Auto-remind customers before due date', enabled: true },
  { key: 'birthday_wishes', label: 'Birthday & Anniversary Wishes', desc: 'Send greetings to retailer owners', enabled: false },
  { key: 'sms_alerts', label: 'SMS Alerts', desc: 'Send SMS for critical updates', enabled: false },
  { key: 'auto_backup', label: 'Auto Backup', desc: 'Daily automated data backup', enabled: true },
  { key: 'low_stock_alert', label: 'Low Stock Alert', desc: 'Notify when product stock falls below reorder level', enabled: true },
  { key: 'otp_login', label: 'OTP Login', desc: 'Require OTP for salesman login', enabled: false },
];

export default function Settings() {
  const [automations, setAutomations] = useState<Record<string, boolean>>(
    Object.fromEntries(automationSettings.map((s) => [s.key, s.enabled]))
  );
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [addUserOpen, setAddUserOpen] = useState(false);

  return (
    <div className="space-y-5">
      <Tabs defaultValue="company">
        <TabsList className="bg-muted/60 p-1 flex-wrap gap-1 h-auto">
          {[
            { value: 'company', label: 'Company', icon: IconBuilding },
            { value: 'roles', label: 'Roles & Permissions', icon: IconShield },
            { value: 'users', label: 'Users', icon: IconUsers },
            { value: 'automation', label: 'Automation', icon: IconBell },
          ].map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="text-xs gap-1.5">
              <Icon size={13} /> {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Company Profile */}
        <TabsContent value="company" className="mt-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
                  <IconBuilding size={16} className="text-primary" /> Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Company Name', value: 'GoldSpice Foods Pvt. Ltd.' },
                  { label: 'GSTIN', value: '29AABCG1234R1ZX' },
                  { label: 'PAN', value: 'AABCG1234R' },
                  { label: 'FSSAI License', value: '10020001000001' },
                  { label: 'Mobile', value: '9800000000' },
                  { label: 'Email', value: 'admin@goldspice.com' },
                  { label: 'Website', value: 'www.goldspice.com' },
                ].map(({ label, value }) => (
                  <div key={label} className="space-y-1.5">
                    <Label className="text-xs">{label}</Label>
                    <Input defaultValue={value} className="h-9" />
                  </div>
                ))}
                <div className="space-y-1.5">
                  <Label className="text-xs">Registered Address</Label>
                  <textarea
                    defaultValue="Plot 12, Industrial Area, Peenya, Bangalore - 560058, Karnataka"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-ring"
                    rows={3}
                  />
                </div>
                <Button className="w-full gap-1.5">
                  <IconCircleCheck size={15} /> Save Company Details
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-sm font-semibold">Bank Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Bank Name', value: 'State Bank of India' },
                    { label: 'Account Number', value: '00112233445566' },
                    { label: 'IFSC Code', value: 'SBIN0001234' },
                    { label: 'Account Type', value: 'Current' },
                    { label: 'UPI ID', value: 'goldspice@sbi' },
                  ].map(({ label, value }) => (
                    <div key={label} className="space-y-1.5">
                      <Label className="text-xs">{label}</Label>
                      <Input defaultValue={value} className="h-8 text-sm" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">Save Bank Details</Button>
                </CardContent>
              </Card>

              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading text-sm font-semibold">Billing Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: 'Invoice Prefix', value: 'INV' },
                    { label: 'Financial Year Start', value: '2024-04-01' },
                    { label: 'Default Payment Terms (days)', value: '30' },
                  ].map(({ label, value }) => (
                    <div key={label} className="space-y-1.5">
                      <Label className="text-xs">{label}</Label>
                      <Input defaultValue={value} className="h-8 text-sm" />
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">Save</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="mt-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {/* Role List */}
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-sm font-semibold">Roles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors text-left ${selectedRole.id === role.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted/60 border border-transparent'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${role.color}`}>{role.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{role.users} users</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Permissions Matrix */}
            <Card className="xl:col-span-2 border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
                  <IconShield size={16} className="text-primary" />
                  {selectedRole.name} — Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {allModules.map((mod) => {
                    const hasPermission = selectedRole.permissions.includes(mod);
                    return (
                      <div
                        key={mod}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-medium capitalize ${hasPermission ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-muted/30 border-border text-muted-foreground'}`}
                      >
                        {hasPermission ? (
                          <IconCircleCheck size={14} className="text-emerald-500 flex-shrink-0" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground/40 flex-shrink-0" />
                        )}
                        {mod.replace(/_/g, ' ')}
                      </div>
                    );
                  })}
                </div>
                <Separator className="my-4" />
                <p className="text-xs text-muted-foreground">
                  Showing permissions for <strong>{selectedRole.name}</strong> role. Click a module to toggle access.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users" className="mt-4 space-y-3">
          <div className="flex items-center justify-end">
            <Button className="h-9 gap-1.5" onClick={() => setAddUserOpen(true)}>
              <IconPlus size={15} /> Add User
            </Button>
          </div>
          <Card className="border border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {['User', 'Email', 'Role', 'Last Login', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold py-3 px-4 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const roleObj = roles.find((r) => r.name === u.role);
                    return (
                      <tr key={u.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                              {u.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-medium">{u.name}</p>
                              <p className="text-xs text-muted-foreground">{u.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-xs">{u.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleObj?.color || 'bg-gray-100 text-gray-700'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{u.lastLogin}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><IconEdit size={13} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><IconKey size={13} /></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><IconTrash size={13} /></Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Automation */}
        <TabsContent value="automation" className="mt-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <Card className="border border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
                  <IconBell size={16} className="text-primary" /> Automation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {automationSettings.map((s) => (
                  <div key={s.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/40 transition-colors">
                    <div className="flex-1 pr-4">
                      <p className="text-sm font-medium">{s.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                    </div>
                    <Switch
                      checked={automations[s.key]}
                      onCheckedChange={(v) => setAutomations((prev) => ({ ...prev, [s.key]: v }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
                    <IconBrandWhatsapp size={16} className="text-emerald-500" /> WhatsApp Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">WhatsApp Business API Key</Label>
                    <Input type="password" placeholder="••••••••••••••••" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">From Number</Label>
                    <Input placeholder="+91XXXXXXXXXX" className="h-8 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Template ID — Invoice</Label>
                    <Input placeholder="invoice_v1" className="h-8 text-sm" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <IconCircleCheck size={13} /> Test Connection
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
                    <IconMail size={16} className="text-blue-500" /> Email Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">SMTP Host</Label>
                    <Input placeholder="smtp.gmail.com" className="h-8 text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Port</Label>
                      <Input placeholder="587" className="h-8 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Encryption</Label>
                      <Select defaultValue="tls">
                        <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">From Email</Label>
                    <Input placeholder="billing@goldspice.com" className="h-8 text-sm" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <IconCircleCheck size={13} /> Test Email
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
                    <IconDeviceMobile size={16} className="text-violet-500" /> SMS Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">SMS Provider</Label>
                    <Select defaultValue="msg91">
                      <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="msg91">MSG91</SelectItem>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="fast2sms">Fast2SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">API Key</Label>
                    <Input type="password" placeholder="••••••••••••••••" className="h-8 text-sm" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <IconCircleCheck size={13} /> Verify SMS
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
