import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import {
  IconArrowLeft, IconUser, IconBuildingStore, IconMapPin,
  IconCreditCard, IconDeviceMobile,
} from '@tabler/icons-react';

interface FormData {
  shopName: string; ownerName: string; type: string; gst: string;
  pan: string; fssai: string; mobile: string; whatsapp: string;
  email: string; address: string; state: string; district: string;
  pincode: string; lat: string; lng: string; territory: string;
  salesman: string; creditLimit: string; paymentTerms: string;
  openingBalance: string; status: string;
}

const indianStates = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal',
];

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon size={15} className="text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-sm text-foreground">{title}</h3>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { customers, addCustomer, updateCustomer } = useAppStore();
  const existing = customers.find((c) => c.id === id);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: existing
      ? {
          shopName: existing.shopName, ownerName: existing.ownerName, type: existing.type,
          gst: existing.gst, pan: existing.pan, fssai: '',
          mobile: existing.mobile, whatsapp: existing.whatsapp, email: existing.email,
          address: existing.address, state: existing.state, district: existing.district,
          pincode: existing.pincode, lat: String(existing.lat), lng: String(existing.lng),
          territory: existing.territory, salesman: existing.salesman,
          creditLimit: String(existing.creditLimit), paymentTerms: existing.paymentTerms,
          openingBalance: String(existing.openingBalance), status: existing.status,
        }
      : { status: 'Active', paymentTerms: '30 days', type: 'Retailer' },
  });

  const onSubmit = (data: FormData) => {
    if (existing) {
      updateCustomer(existing.id, {
        ...data,
        creditLimit: Number(data.creditLimit),
        openingBalance: Number(data.openingBalance),
        lat: Number(data.lat) || 0,
        lng: Number(data.lng) || 0,
      });
    } else {
      const newId = `CUST${String(Date.now()).slice(-3)}`;
      addCustomer({
        id: newId, shopName: data.shopName, ownerName: data.ownerName, type: data.type,
        gst: data.gst, pan: data.pan, mobile: data.mobile, whatsapp: data.whatsapp,
        email: data.email, address: data.address, state: data.state, district: data.district,
        pincode: data.pincode, territory: data.territory, salesman: data.salesman,
        creditLimit: Number(data.creditLimit), paymentTerms: data.paymentTerms,
        openingBalance: Number(data.openingBalance), status: data.status,
        lat: Number(data.lat) || 0, lng: Number(data.lng) || 0,
      });
    }
    navigate('/customers');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/customers')} className="h-8 w-8">
          <IconArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="font-heading font-bold text-lg text-foreground">
            {existing ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <p className="text-xs text-muted-foreground">
            {existing ? `Editing: ${existing.shopName}` : 'Fill in the details to add a new customer'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic Info */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconUser} title="Basic Information" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Shop Name" required>
                <Input {...register('shopName', { required: true })} placeholder="Enter shop name" />
              </Field>
              <Field label="Owner Name" required>
                <Input {...register('ownerName', { required: true })} placeholder="Owner's full name" />
              </Field>
              <Field label="Customer Type" required>
                <Select value={watch('type')} onValueChange={(v) => setValue('type', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Distributor', 'Super Stockist', 'Retailer', 'Wholesaler', 'Modern Trade'].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="GST Number">
                <Input {...register('gst')} placeholder="29AABCU9603R1ZX" className="uppercase" />
              </Field>
              <Field label="PAN Number">
                <Input {...register('pan')} placeholder="ABCDE1234F" className="uppercase" />
              </Field>
              <Field label="FSSAI License (Optional)">
                <Input {...register('fssai')} placeholder="FSSAI license number" />
              </Field>
              <Field label="Status">
                <Select value={watch('status')} onValueChange={(v) => setValue('status', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconDeviceMobile} title="Contact Information" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Mobile" required>
                <Input {...register('mobile', { required: true })} placeholder="10-digit mobile" maxLength={10} />
              </Field>
              <Field label="WhatsApp Number">
                <Input {...register('whatsapp')} placeholder="WhatsApp number" maxLength={10} />
              </Field>
              <Field label="Email Address">
                <Input {...register('email')} type="email" placeholder="email@example.com" />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconMapPin} title="Address" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="sm:col-span-2 lg:col-span-3">
                <Field label="Street Address">
                  <Input {...register('address')} placeholder="Street address, area" />
                </Field>
              </div>
              <Field label="State">
                <Select value={watch('state')} onValueChange={(v) => setValue('state', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="District">
                <Input {...register('district')} placeholder="District" />
              </Field>
              <Field label="Pincode">
                <Input {...register('pincode')} placeholder="6-digit pincode" maxLength={6} />
              </Field>
              <Field label="Latitude (GPS)">
                <Input {...register('lat')} placeholder="e.g. 12.9716" />
              </Field>
              <Field label="Longitude (GPS)">
                <Input {...register('lng')} placeholder="e.g. 77.5946" />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* Sales & Financial */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconBuildingStore} title="Sales Assignment" />
          </CardHeader>
          <CardContent className="px-6 pb-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Sales Territory">
                <Input {...register('territory')} placeholder="e.g. Bangalore South" />
              </Field>
              <Field label="Assigned Salesman">
                <Input {...register('salesman')} placeholder="Salesman name" />
              </Field>
            </div>
          </CardContent>
          <Separator className="mx-6" />
          <CardHeader className="pb-0 pt-4 px-6">
            <SectionHeader icon={IconCreditCard} title="Financial Details" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Credit Limit (₹)">
                <Input {...register('creditLimit')} type="number" placeholder="0" />
              </Field>
              <Field label="Payment Terms">
                <Select value={watch('paymentTerms')} onValueChange={(v) => setValue('paymentTerms', v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['Cash on Delivery', '7 days', '15 days', '30 days', '45 days', '60 days'].map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Opening Balance (₹)">
                <Input {...register('openingBalance')} type="number" placeholder="0" />
              </Field>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate('/customers')}>
            Cancel
          </Button>
          <Button type="submit" className="px-8">
            {existing ? 'Update Customer' : 'Add Customer'}
          </Button>
        </div>
      </form>
    </div>
  );
}
