import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  IconArrowLeft,
  IconUser,
  IconBuildingStore,
  IconMapPin,
  IconCreditCard,
  IconDeviceMobile,
} from "@tabler/icons-react";
import {
  CreateCustomerInput,
  customerSchema,
  CustomerType,
} from "@/features/customers/types/customer.types";
import { indianStates } from "@/features/customers/constants/states";
import { useGetAllSalesman } from "@/features/employee/hooks/useGetAllSalesman";
import { Employee } from "@/features/employee/types/employee.types";
import { useCreateCustomer } from "@/features/customers/hooks/useCreateCustomer";
import ButtonLoader from "@/components/ButtonLoader";
import { customerTypes } from "@/features/customers/constants/customerType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCustomer } from "@/features/customers/hooks/useGetCustomer";
import { useEffect } from "react";
import { useUpdateCustomer } from "@/features/customers/hooks/useUpdateCustomer";

function SectionHeader({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon size={15} className="text-primary" />
      </div>
      <h3 className="font-heading font-semibold text-sm text-foreground">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function CustomerForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: customer } = useGetCustomer(id as string);
  const { data } = useGetAllSalesman();
  const { mutate, isPending } = useCreateCustomer();
  const { mutate: updateMutation, isPending: isUpdating } = useUpdateCustomer();
  const salesmen = data?.data || [];

  const isEditing = customer?.status ? true : false;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      shopName: "",
      ownerName: "",
      type: "",
      gstNumber: "",
      pan: "",
      fssai: "",
      mobile: "",
      whatsapp: "",
      email: "",
      address: "",
      state: "",
      district: "",
      pincode: "",
      latitude: "",
      longitude: "",
      territory: "",
      assignedSalesmanId: "",
      creditLimit: 0,
      paymentTerms: 0,
      openingBalance: 0,
      status: "ACTIVE",
    },
  });

  useEffect(() => {
    if (!customer?.data) return;

    const data = customer.data;

    reset({
      shopName: data.shopName ?? "",
      ownerName: data.ownerName ?? "",
      type: data.type ?? "",

      gstNumber: data.gstNumber ?? "",
      pan: data.pan ?? "",
      fssai: data.fssai ?? "",

      mobile: data.mobile ?? "",
      whatsapp: data.whatsapp ?? "",
      email: data.email ?? "",

      address: data.street ?? "",
      state: data.state ?? "",
      district: data.district ?? "",
      pincode: data.pincode ?? "",

      latitude: data.latitude ?? "",
      longitude: data.longitude ?? "",

      territory: data.salesTerritory ?? "",
      assignedSalesmanId: data.assignedSalesmanId ?? "",

      creditLimit: Number(data.creditLimit ?? 0),
      paymentTerms: Number(data.paymentTerms ?? 0),
      openingBalance: Number(data.openingBal ?? 0),

      status: data.status ?? "ACTIVE",
    });
  }, [customer, reset]);

  const onSubmit = (data: CreateCustomerInput) => {
    if (isEditing) {
      updateMutation({
        id,
        ...data,
      });
    } else {
      mutate(data);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/customers")}
          className="h-8 w-8"
        >
          <IconArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="font-heading font-bold text-lg text-foreground">
            {isEditing ? "Edit Customer Details" : "Add New Customer"}
          </h2>
          <p className="text-xs text-muted-foreground">
            {isEditing
              ? `Update details for ${customer?.data?.shopName}`
              : "Fill in the details to add a new customer"}
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
                <Input
                  {...register("shopName")}
                  placeholder="Enter shop name"
                />

                {errors.shopName && (
                  <p className="text-xs text-destructive">
                    {errors.shopName.message}
                  </p>
                )}
              </Field>
              <Field label="Owner Name" required>
                <Input
                  {...register("ownerName")}
                  placeholder="Owner's full name"
                />

                {errors.ownerName && (
                  <p className="text-xs text-destructive">
                    {errors.ownerName.message}
                  </p>
                )}
              </Field>

              <Field label="Customer Type" required>
                <Select
                  value={watch("type")}
                  onValueChange={(v) => setValue("type", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {customerTypes.map((t: CustomerType) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {errors.type && (
                  <p className="text-xs text-destructive">
                    {errors.type.message}
                  </p>
                )}
              </Field>
              <Field label="GST Number">
                <Input
                  {...register("gstNumber")}
                  placeholder="29AABCU9603R1ZX"
                  className="uppercase"
                />
                {errors.gstNumber && (
                  <p className="text-xs text-destructive">
                    {errors.gstNumber.message}
                  </p>
                )}
              </Field>
              <Field label="PAN Number">
                <Input
                  {...register("pan")}
                  placeholder="ABCDE1234F"
                  className="uppercase"
                />
                {errors.pan && (
                  <p className="text-xs text-destructive">
                    {errors.pan.message}
                  </p>
                )}
              </Field>
              <Field label="FSSAI License (Optional)">
                <Input
                  {...register("fssai")}
                  placeholder="FSSAI license number"
                />
                {errors.fssai && (
                  <p className="text-xs text-destructive">
                    {errors.fssai.message}
                  </p>
                )}
              </Field>
              <Field label="Status">
                <Select
                  value={watch("status")}
                  onValueChange={(v) =>
                    setValue("status", v as "ACTIVE" | "INACTIVE")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-0 pt-5 px-6">
            <SectionHeader
              icon={IconDeviceMobile}
              title="Contact Information"
            />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Mobile" required>
                <Input
                  {...register("mobile")}
                  placeholder="10-digit mobile"
                  maxLength={10}
                />

                {errors.mobile && (
                  <p className="text-xs text-destructive">
                    {errors.mobile.message}
                  </p>
                )}
              </Field>
              <Field label="WhatsApp Number">
                <Input
                  {...register("whatsapp")}
                  placeholder="WhatsApp number"
                  maxLength={10}
                />
                {errors.whatsapp && (
                  <p className="text-xs text-destructive">
                    {errors.whatsapp.message}
                  </p>
                )}
              </Field>
              <Field label="Email Address">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
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
                  <Input
                    {...register("address")}
                    placeholder="Street address, area"
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive">
                      {errors.address.message}
                    </p>
                  )}
                </Field>
              </div>
              <Field label="State">
                <Select
                  value={watch("state")}
                  onValueChange={(v) => setValue("state", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {indianStates.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="District">
                <Input {...register("district")} placeholder="District" />
                {errors.district && (
                  <p className="text-xs text-destructive">
                    {errors.district.message}
                  </p>
                )}
              </Field>
              <Field label="Pincode">
                <Input
                  {...register("pincode")}
                  placeholder="6-digit pincode"
                  maxLength={6}
                />
                {errors.pincode && (
                  <p className="text-xs text-destructive">
                    {errors.pincode.message}
                  </p>
                )}
              </Field>
              <Field label="Latitude (GPS)">
                <Input {...register("latitude")} placeholder="e.g. 12.9716" />
                {errors.latitude && (
                  <p className="text-xs text-destructive">
                    {errors.latitude.message}
                  </p>
                )}
              </Field>
              <Field label="Longitude (GPS)">
                <Input {...register("longitude")} placeholder="e.g. 77.5946" />
                {errors.longitude && (
                  <p className="text-xs text-destructive">
                    {errors.longitude.message}
                  </p>
                )}
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
                <Input
                  {...register("territory")}
                  placeholder="e.g. Bangalore South"
                />
                {errors.territory && (
                  <p className="text-xs text-destructive">
                    {errors.territory.message}
                  </p>
                )}
              </Field>
              <Field label="Assigned Salesman">
                <Select
                  value={watch("assignedSalesmanId")}
                  onValueChange={(v) => setValue("assignedSalesmanId", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select salesman" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {salesmen.length > 0
                      ? salesmen.map((s: Employee) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.fullName}
                          </SelectItem>
                        ))
                      : "No salesmen found"}
                  </SelectContent>
                </Select>
              </Field>
            </div>
          </CardContent>
          <CardHeader className="pb-0 pt-4 px-6">
            <SectionHeader icon={IconCreditCard} title="Financial Details" />
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Field label="Credit Limit (₹)">
                <Input
                  {...register("creditLimit")}
                  type="number"
                  placeholder="0"
                />
                {errors.creditLimit && (
                  <p className="text-xs text-destructive">
                    {errors.creditLimit.message}
                  </p>
                )}
              </Field>
              <Field label="Payment Terms (days)">
                <Input
                  {...register("paymentTerms")}
                  type="number"
                  placeholder="0"
                />
                {errors.paymentTerms && (
                  <p className="text-xs text-destructive">
                    {errors.paymentTerms.message}
                  </p>
                )}
              </Field>

              <Field label="Opening Balance (₹)">
                <Input
                  {...register("openingBalance")}
                  type="number"
                  placeholder="0"
                />
                {errors.openingBalance && (
                  <p className="text-xs text-destructive">
                    {errors.openingBalance.message}
                  </p>
                )}
              </Field>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/customers")}
          >
            Cancel
          </Button>
          <Button type="submit" className="px-8" disabled={isPending}>
            {isPending ? (
              <ButtonLoader
                text={isEditing ? "Updating customer..." : "Adding customer..."}
              />
            ) : isEditing ? (
              "Update Customer"
            ) : (
              "Add Customer"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
