import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAppStore } from "../../store/appStore";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { Badge } from "../../components/ui/badge";
import {
  IconArrowLeft,
  IconPackage,
  IconCurrencyRupee,
  IconBuildingWarehouse,
  IconBarcode,
  IconClipboardCheck,
  IconFlask,
  IconShieldCheck,
  IconCircleCheck,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { ProductFormData } from "@/features/product/types/product.types";
import { useCreateProduct } from "@/features/product/hooks/useCreateProduct";

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
      {hint && <p className="text-[10px] text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

function SectionCard({
  icon: Icon,
  title,
  description,
  badge,
  children,
  defaultOpen = true,
}: {
  icon: any;
  title: string;
  description: string;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="border border-border shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-primary" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-sm text-foreground">
                {title}
              </h3>
              {badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-700">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {description}
            </p>
          </div>
        </div>
        {open ? (
          <IconChevronUp size={18} className="text-muted-foreground" />
        ) : (
          <IconChevronDown size={18} className="text-muted-foreground" />
        )}
      </button>
      {open && (
        <>
          <Separator />
          <CardContent className="px-6 py-5">{children}</CardContent>
        </>
      )}
    </Card>
  );
}

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { mutate, isPending } = useCreateProduct();
  const { products, addProduct, updateProduct } = useAppStore();
  const existing = products.find((p) => p.id === id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      unit: "Pcs",
      category: "",
      type: "FINISHED_GOOD",
      form: "POWDER",
      grade: "",
      vegNonVeg: "VEG",
      countryOfOrigin: "",
      processingMethod: "",
      packagingType: "Pouch",
    },
  });

  const onSubmit = (data: ProductFormData) => {
    console.log(data);
    mutate(data);
  };

  const completedSections = 6;
  const totalSections = 6;

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/products")}
            className="h-8 w-8"
          >
            <IconArrowLeft size={16} />
          </Button>
          <div>
            <h2 className="font-heading font-bold text-lg text-foreground">
              {existing ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {existing
                ? `Editing: ${existing.name}`
                : "Fill in product details across all compliance sections"}
            </p>
          </div>
        </div>
        <Badge variant="outline" className="gap-1.5 px-3 py-1.5">
          <IconCircleCheck size={13} className="text-emerald-500" />
          {completedSections}/{totalSections} sections
        </Badge>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Section 1: Legal/Regulatory Label Info */}
        <SectionCard
          icon={IconClipboardCheck}
          title="Legal & Regulatory Label Info"
          description="FSSAI-mandated fields that must appear on the product packet"
          badge="FSSAI"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="FSSAI License Number" required>
              <Input
                {...register("fssaiLicense", { required: true })}
                placeholder="10020001000001"
                className="h-9"
              />
            </Field>
            <Field
              label="Product / Common Name"
              required
              hint="e.g. Turmeric Powder, Haldi Powder"
            >
              <Input
                {...register("commonName", { required: true })}
                placeholder="Turmeric Powder"
                className="h-9"
              />
            </Field>
            <Field
              label="Net Weight / Quantity"
              required
              hint="Metric units (g, kg, ml)"
            >
              <Input
                {...register("netWeight", { required: true })}
                placeholder="100g"
                className="h-9"
              />
            </Field>
            <Field label="Manufacturing Date" required>
              <Input
                {...register("mfgDate", { required: true })}
                type="date"
                className="h-9"
              />
            </Field>
            <Field label="Expiry / Best Before Date" required>
              <Input
                {...register("expiryDate", { required: true })}
                type="date"
                className="h-9"
              />
            </Field>
            <Field label="Best Before (text)" hint="e.g. 12 months from mfg">
              <Input
                {...register("bestBefore")}
                placeholder="12 months"
                className="h-9"
              />
            </Field>
            <Field label="Batch / Lot Number" required>
              <Input
                {...register("batchNo", { required: true })}
                placeholder="B2024001"
                className="h-9"
              />
            </Field>
            <Field label="MRP (inclusive of taxes)" required>
              <Input
                {...register("mrp", { required: true })}
                type="number"
                placeholder="45"
                className="h-9"
              />
            </Field>
            <Field label="Veg / Non-Veg" required>
              <Select
                value={watch("vegNonVeg")}
                onValueChange={(v) =>
                  setValue("vegNonVeg", v as "VEG" | "NON_VEG")
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VEG">Veg (Green dot)</SelectItem>
                  <SelectItem value="NON-VEG">Non-Veg (Brown dot)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Country of Origin" required>
              <Input
                {...register("countryOfOrigin", { required: true })}
                placeholder="India"
                className="h-9"
              />
            </Field>
            <Field label="Customer Care Phone" required>
              <Input
                {...register("customerCarePhone", { required: true })}
                placeholder="1800-123-4567"
                className="h-9"
              />
            </Field>
            <Field label="Customer Care Email" required>
              <Input
                {...register("customerCareEmail", { required: true })}
                type="email"
                placeholder="care@goldspice.com"
                className="h-9"
              />
            </Field>
            <Field label="Manufacturer Name" required>
              <Input
                {...register("manufacturerName", { required: true })}
                placeholder="GoldSpice Foods Pvt. Ltd."
                className="h-9"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Manufacturer Address" required>
                <Textarea
                  {...register("manufacturerAddress", { required: true })}
                  placeholder="Full address"
                  rows={2}
                  className="text-sm resize-none"
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field
                label="Ingredients List"
                hint="With % for blends, e.g. Coriander (40%), Cumin (30%)..."
              >
                <Textarea
                  {...register("ingredients")}
                  placeholder="Coriander (40%), Cumin (30%), Turmeric (20%), Black Pepper (10%)"
                  rows={2}
                  className="text-sm resize-none"
                />
              </Field>
            </div>
            <Field label="Storage Instructions">
              <Input
                {...register("storageInstructions")}
                placeholder="Store in a cool, dry place"
                className="h-9"
              />
            </Field>
            <Field
              label="Allergen Info"
              hint="e.g. May contain traces of mustard"
            >
              <Input
                {...register("allergenInfo")}
                placeholder="May contain traces of mustard"
                className="h-9"
              />
            </Field>
          </div>
        </SectionCard>

        {/* Section 2: Product Master Data */}
        <SectionCard
          icon={IconPackage}
          title="Product Master Data"
          description="Core product identification and classification"
          defaultOpen={false}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Product ID / SKU Code" required>
              <Input
                {...register("code", { required: true })}
                placeholder="SP-001"
                className="h-9"
              />
            </Field>
            <Field label="Barcode">
              <Input
                {...register("barcode")}
                placeholder="8901234560010"
                className="h-9"
              />
            </Field>
            <Field label="Product Name" required>
              <Input
                {...register("name", { required: true })}
                placeholder="Turmeric Powder 100g"
                className="h-9"
              />
            </Field>
            <Field label="Category" required>
              <Select
                value={watch("category")}
                onValueChange={(v) => setValue("category", v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Powder Spices",
                    "Whole Spices",
                    "Blended Spices",
                    "Seeds",
                    "Extracts",
                    "Seasonings",
                  ].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Brand">
              <Input
                {...register("brand")}
                placeholder="GoldSpice"
                className="h-9"
              />
            </Field>
            <Field
              label="Botanical / Scientific Name"
              hint="e.g. Cuminum cyminum for cumin"
            >
              <Input
                {...register("botanicalName")}
                placeholder="Curcuma longa"
                className="h-9"
              />
            </Field>
            <Field label="Grade / Quality Tier">
              <Select
                value={watch("grade")}
                onValueChange={(v) => setValue("grade", v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Grade A",
                    "Grade B",
                    "Special",
                    "Extra Bold",
                    "Premium",
                  ].map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Form">
              <Select
                value={watch("form")}
                onValueChange={(v) =>
                  setValue(
                    "form",
                    v as
                      | "POWDER"
                      | "WHOLE"
                      | "CRUSHED"
                      | "GRANULES"
                      | "PASTE"
                      | "LIQUID"
                      | "OTHER",
                  )
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "POWDER",
                    "WHOLE",
                    "CRUSHED",
                    "GRANULES",
                    "PASTE",
                    "LIQUID",
                    "OTHER",
                  ].map((f) => (
                    <SelectItem key={f} value={f}>
                      {f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="HSN Code" hint="For GST invoicing">
              <Input {...register("hsn")} placeholder="0910" className="h-9" />
            </Field>
            <Field label="Unit of Measure">
              <Select
                value={watch("unit")}
                onValueChange={(v) => setValue("unit", v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Pcs", "Kg", "Box", "Carton", "Litre", "Pack"].map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </SectionCard>

        {/* Section 3: Manufacturing & Batch Details */}
        <SectionCard
          icon={IconFlask}
          title="Manufacturing & Batch Details"
          description="Production, QC, and raw material traceability"
          defaultOpen={false}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field
              label="Batch Number"
              required
              hint="Linked to raw material lot"
            >
              <Input
                {...register("batchNo")}
                placeholder="B2024001"
                className="h-9"
              />
            </Field>
            <Field label="Raw Material Source / Supplier ID">
              <Input
                {...register("rawMaterialSource")}
                placeholder="SUP-001"
                className="h-9"
              />
            </Field>
            <Field label="Production Date">
              <Input
                {...register("productionDate")}
                type="date"
                className="h-9"
              />
            </Field>
            <Field label="Processing Unit / Plant ID">
              <Input
                {...register("plantId")}
                placeholder="PLANT-01"
                className="h-9"
              />
            </Field>
            <Field label="Processing Method">
              <Select
                value={watch("processingMethod")}
                onValueChange={(v) => setValue("processingMethod", v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Sun-dried",
                    "Machine-dried",
                    "Steam-sterilized",
                    "Roasted",
                    "Ground",
                  ].map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Moisture Content (%)" hint="QC test result">
              <Input
                {...register("moistureContent")}
                type="number"
                placeholder="8.5"
                className="h-9"
              />
            </Field>
            <Field label="Purity Test Result" hint="QC reference">
              <Input
                {...register("purityTest")}
                placeholder="99.2% — QC/2024/001"
                className="h-9"
              />
            </Field>
            <Field label="Adulteration Test Reference" hint="If applicable">
              <Input
                {...register("adulterationTest")}
                placeholder="NIL — LAB/2024/0042"
                className="h-9"
              />
            </Field>
          </div>
        </SectionCard>

        {/* Section 4: Packaging & Inventory */}
        <SectionCard
          icon={IconBuildingWarehouse}
          title="Packaging & Inventory"
          description="Pack type, shelf life, and warehouse stock"
          defaultOpen={false}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Packaging Type">
              <Select
                value={watch("packagingType")}
                onValueChange={(v) => setValue("packagingType", v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Pouch", "Box", "Jar", "Sachet", "Bottle", "Tin"].map(
                    (p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Pack Size Variant" hint="e.g. 50g, 100g, 500g, 1kg">
              <Input
                {...register("packSize")}
                placeholder="100g"
                className="h-9"
              />
            </Field>
            <Field label="Shelf Life (months from mfg)">
              <Input
                {...register("shelfLife")}
                type="number"
                placeholder="12"
                className="h-9"
              />
            </Field>
            <Field label="Warehouse / Bin Location">
              <Input
                {...register("warehouseLocation")}
                placeholder="WH-01-A-03"
                className="h-9"
              />
            </Field>
            <Field label="Current Stock">
              <Input
                {...register("currentStock")}
                type="number"
                placeholder="0"
                className="h-9"
              />
            </Field>
            <Field label="Reorder Level">
              <Input
                {...register("reorderLevel")}
                type="number"
                placeholder="0"
                className="h-9"
              />
            </Field>
          </div>
        </SectionCard>

        {/* Section 5: Commercial Fields */}
        <SectionCard
          icon={IconCurrencyRupee}
          title="Commercial Fields"
          description="Pricing, GST, and discount schemes"
          defaultOpen={false}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Field label="MRP (₹)" required>
              <Input
                {...register("mrp", { required: true })}
                type="number"
                placeholder="45"
                className="h-9"
              />
            </Field>
            <Field label="Distributor Price (₹)">
              <Input
                {...register("distributorPrice")}
                type="number"
                placeholder="32"
                className="h-9"
              />
            </Field>
            <Field label="Retailer Price (₹)">
              <Input
                {...register("retailerPrice")}
                type="number"
                placeholder="36"
                className="h-9"
              />
            </Field>
            <Field label="Dealer Price (₹)">
              <Input
                {...register("dealerPrice")}
                type="number"
                placeholder="34"
                className="h-9"
              />
            </Field>
            <Field label="Purchase Cost (₹)">
              <Input
                {...register("purchaseCost")}
                type="number"
                placeholder="22"
                className="h-9"
              />
            </Field>
            <Field label="Manufacturing Cost (₹)">
              <Input
                {...register("manufacturingCost")}
                type="number"
                placeholder="8"
                className="h-9"
              />
            </Field>
            <Field label="GST %">
              <Select
                value={watch("gst")}
                onValueChange={(v) => setValue("gst", v)}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["0", "5", "12", "18", "28"].map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Discount / Scheme" hint="e.g. Buy 10 Get 1 Free">
              <Input
                {...register("discountScheme")}
                placeholder="Buy 10 Get 1 Free"
                className="h-9"
              />
            </Field>
          </div>
        </SectionCard>

        {/* Section 6: Traceability & Compliance */}
        <SectionCard
          icon={IconShieldCheck}
          title="Traceability & Compliance"
          description="Certifications, export docs, and test reports"
          defaultOpen={false}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Field
                label="Certifications"
                hint="e.g. Organic, ISO 22000, HACCP, Spices Board Reg"
              >
                <Textarea
                  {...register("certifications")}
                  placeholder="Organic (NPOP), ISO 22000:2018, HACCP, Spices Board Reg No. SBR/KA/0142"
                  rows={2}
                  className="text-sm resize-none"
                />
              </Field>
            </div>
            <Field label="Export Certificate Number" hint="If applicable">
              <Input
                {...register("exportCertNumber")}
                placeholder="EXP/2024/00567"
                className="h-9"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="Pesticide Residue Test Report Ref"
                hint="Lab report reference"
              >
                <Input
                  {...register("pesticideTestRef")}
                  placeholder="LAB/PST/2024/0123 — Within limits"
                  className="h-9"
                />
              </Field>
            </div>
          </div>
        </SectionCard>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/products")}
          >
            Cancel
          </Button>
          <Button type="submit" className="px-8 gap-1.5">
            <IconCircleCheck size={16} />
            {existing ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
