import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store/appStore';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { IconArrowLeft, IconPackage, IconCurrencyRupee, IconBuildingWarehouse, IconBarcode } from '@tabler/icons-react';

interface FormData {
  code: string; barcode: string; name: string; category: string; brand: string;
  hsn: string; gst: string; unit: string; weight: string;
  mrp: string; distributorPrice: string; retailerPrice: string; dealerPrice: string;
  purchaseCost: string; manufacturingCost: string;
  currentStock: string; reorderLevel: string;
  batchNo: string; mfgDate: string; expiryDate: string;
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

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addProduct, updateProduct } = useAppStore();
  const existing = products.find((p) => p.id === id);

  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: existing
      ? {
          code: existing.code, barcode: existing.barcode, name: existing.name,
          category: existing.category, brand: existing.brand, hsn: existing.hsn,
          gst: String(existing.gst), unit: existing.unit, weight: existing.weight,
          mrp: String(existing.mrp), distributorPrice: String(existing.distributorPrice),
          retailerPrice: String(existing.retailerPrice), dealerPrice: String(existing.dealerPrice),
          purchaseCost: String(existing.purchaseCost), manufacturingCost: String(existing.manufacturingCost),
          currentStock: String(existing.currentStock), reorderLevel: String(existing.reorderLevel),
          batchNo: existing.batchNo, mfgDate: existing.mfgDate, expiryDate: existing.expiryDate,
        }
      : { gst: '5', unit: 'Pcs', category: 'Powder Spices' },
  });

  const onSubmit = (data: FormData) => {
    const payload = {
      code: data.code, barcode: data.barcode, name: data.name, category: data.category,
      brand: data.brand, hsn: data.hsn, gst: Number(data.gst), unit: data.unit,
      weight: data.weight, mrp: Number(data.mrp), distributorPrice: Number(data.distributorPrice),
      retailerPrice: Number(data.retailerPrice), dealerPrice: Number(data.dealerPrice),
      purchaseCost: Number(data.purchaseCost), manufacturingCost: Number(data.manufacturingCost),
      currentStock: Number(data.currentStock), reorderLevel: Number(data.reorderLevel),
      batchNo: data.batchNo, mfgDate: data.mfgDate, expiryDate: data.expiryDate,
      status: 'Active' as const,
    };
    if (existing) {
      updateProduct(existing.id, payload);
    } else {
      addProduct({ id: `PROD${Date.now()}`, ...payload });
    }
    navigate('/products');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate('/products')} className="h-8 w-8">
          <IconArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="font-heading font-bold text-lg text-foreground">
            {existing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-xs text-muted-foreground">{existing ? `Editing: ${existing.name}` : 'Fill in product details'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconPackage} title="Product Information" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Product Code" required>
                <Input {...register('code', { required: true })} placeholder="SP-001" />
              </Field>
              <Field label="Barcode">
                <Input {...register('barcode')} placeholder="8901234560010" />
              </Field>
              <Field label="Product Name" required>
                <Input {...register('name', { required: true })} placeholder="Product name" />
              </Field>
              <Field label="Category" required>
                <Select value={watch('category')} onValueChange={(v) => setValue('category', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Powder Spices', 'Whole Spices', 'Blended Spices', 'Seeds', 'Extracts'].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Brand">
                <Input {...register('brand')} placeholder="GoldSpice" />
              </Field>
              <Field label="HSN Code">
                <Input {...register('hsn')} placeholder="0910" />
              </Field>
              <Field label="GST %">
                <Select value={watch('gst')} onValueChange={(v) => setValue('gst', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['0', '5', '12', '18', '28'].map((g) => (
                      <SelectItem key={g} value={g}>{g}%</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Unit">
                <Select value={watch('unit')} onValueChange={(v) => setValue('unit', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Pcs', 'Kg', 'Box', 'Carton', 'Litre', 'Pack'].map((u) => (
                      <SelectItem key={u} value={u}>{u}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Weight / Volume">
                <Input {...register('weight')} placeholder="100g, 500ml..." />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconCurrencyRupee} title="Pricing" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'mrp', label: 'MRP (₹)' },
                { name: 'distributorPrice', label: 'Distributor (₹)' },
                { name: 'retailerPrice', label: 'Retailer (₹)' },
                { name: 'dealerPrice', label: 'Dealer (₹)' },
                { name: 'purchaseCost', label: 'Purchase Cost (₹)' },
                { name: 'manufacturingCost', label: 'Mfg. Cost (₹)' },
              ].map(({ name, label }) => (
                <Field key={name} label={label}>
                  <Input {...register(name as keyof FormData)} type="number" placeholder="0.00" />
                </Field>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stock */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconBuildingWarehouse} title="Stock Levels" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Current Stock">
                <Input {...register('currentStock')} type="number" placeholder="0" />
              </Field>
              <Field label="Reorder Level">
                <Input {...register('reorderLevel')} type="number" placeholder="0" />
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* Batch */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader icon={IconBarcode} title="Batch Details" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Field label="Batch Number">
                <Input {...register('batchNo')} placeholder="B2024001" />
              </Field>
              <Field label="Manufacturing Date">
                <Input {...register('mfgDate')} type="date" />
              </Field>
              <Field label="Expiry Date">
                <Input {...register('expiryDate')} type="date" />
              </Field>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate('/products')}>Cancel</Button>
          <Button type="submit" className="px-8">{existing ? 'Update Product' : 'Add Product'}</Button>
        </div>
      </form>
    </div>
  );
}
