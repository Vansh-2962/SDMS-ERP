import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ButtonLoader from "@/components/ButtonLoader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useUpdateEmployee } from "../hooks/useEmployees";
import type {
  CreateEmployeeInput,
  Employee,
  UpdateEmployeeInput,
} from "../types/employee.types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
}

const roles = [
  "OWNER",
  "ACCOUNTANT",
  "SALES_MANAGER",
  "SALESMAN",
  "WAREHOUSE",
  "PRODUCTION",
  "DISPATCH",
] as const;

const dateInputValue = (date?: string) =>
  date ? new Date(date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);

export default function EmployeeFormDialog({
  open,
  onOpenChange,
  employee,
}: Props) {
  const isEditing = Boolean(employee);
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const isPending = createMutation.isPending || updateMutation.isPending;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateEmployeeInput>({
    defaultValues: {
      fullName: "",
      mobile: "",
      department: "",
      territory: "",
      email: "",
      role: "SALESMAN",
      pan: "",
      aadhaar: "",
      bankAccountNo: "",
      ifscCode: "",
      salary: undefined,
      joinDate: dateInputValue(),
      createLogin: false,
      password: "",
    },
  });
  const createLogin = watch("createLogin");

  useEffect(() => {
    reset({
      fullName: employee?.fullName ?? "",
      mobile: employee?.mobile ?? "",
      department: employee?.department ?? "",
      territory: employee?.territory ?? "",
      email: employee?.email ?? "",
      role: (employee?.role as CreateEmployeeInput["role"]) ?? "SALESMAN",
      pan: employee?.pan ?? "",
      aadhaar: employee?.aadhar ?? "",
      bankAccountNo: employee?.bankAccNo ?? "",
      ifscCode: employee?.IFSC ?? "",
      salary: employee?.salary ?? undefined,
      joinDate: dateInputValue(employee?.joinDate),
      createLogin: false,
      password: "",
    });
  }, [employee, open, reset]);

  const onSubmit = (data: CreateEmployeeInput) => {
    if (employee) {
      const values: UpdateEmployeeInput = {
        fullName: data.fullName,
        mobile: data.mobile,
        department: data.department,
        territory: data.territory,
        email: data.email,
        role: data.role,
        pan: data.pan,
        aadhaar: data.aadhaar,
        bankAccountNo: data.bankAccountNo,
        ifscCode: data.ifscCode,
        salary: data.salary,
        joinDate: data.joinDate,
      };
      updateMutation.mutate(
        { id: employee.id, ...values },
        { onSuccess: () => onOpenChange(false) },
      );
      return;
    }

    createMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
        reset();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) onOpenChange(nextOpen);
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="font-heading">
              {isEditing ? "Edit Employee" : "Add Employee"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name *</Label>
              <Input
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Enter at least 2 characters" },
                })}
              />
              {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mobile">Mobile *</Label>
              <Input
                id="mobile"
                type="tel"
                maxLength={10}
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit mobile number" },
                })}
              />
              {errors.mobile && <p className="text-xs text-destructive">{errors.mobile.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="role">Role *</Label>
              <select
                id="role"
                {...register("role", { required: "Role is required" })}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
              >
                {roles.map((role) => <option key={role} value={role}>{role.replace(/_/g, " ")}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="department">Department</Label>
              <Input id="department" {...register("department")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="territory">Territory</Label>
              <Input id="territory" {...register("territory")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: createLogin ? "Email is required for a login account" : false,
                })}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="salary">Monthly salary (₹)</Label>
              <Input
                id="salary"
                type="number"
                min="0"
                step="0.01"
                {...register("salary", {
                  setValueAs: (value: string) => value === "" ? undefined : Number(value),
                })}
              />
              {errors.salary && <p className="text-xs text-destructive">{errors.salary.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="joinDate">Join date *</Label>
              <Input
                id="joinDate"
                type="date"
                {...register("joinDate", { required: "Join date is required" })}
              />
              {errors.joinDate && <p className="text-xs text-destructive">{errors.joinDate.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pan">PAN</Label>
              <Input id="pan" maxLength={10} {...register("pan")} />
              {errors.pan && <p className="text-xs text-destructive">{errors.pan.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="aadhaar">Aadhaar</Label>
              <Input id="aadhaar" inputMode="numeric" maxLength={12} {...register("aadhaar")} />
              {errors.aadhaar && <p className="text-xs text-destructive">{errors.aadhaar.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bankAccountNo">Bank account number</Label>
              <Input id="bankAccountNo" {...register("bankAccountNo")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ifscCode">IFSC code</Label>
              <Input id="ifscCode" maxLength={11} {...register("ifscCode")} />
            </div>
          </div>

          {!isEditing && (
            <div className="space-y-3 rounded-md border p-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" {...register("createLogin")} />
                Create a login account for this employee
              </label>
              {createLogin && (
                <div className="space-y-1.5">
                  <Label htmlFor="password">Login password *</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password", {
                      required: createLogin ? "Password is required for a login account" : false,
                      ...(createLogin && {
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      }),
                    })}
                  />
                  {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                  {!watch("email") && <p className="text-xs text-destructive">An email is required for a login account.</p>}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? <ButtonLoader text={isEditing ? "Saving..." : "Adding..."} />
                : isEditing ? "Save changes" : "Add employee"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
