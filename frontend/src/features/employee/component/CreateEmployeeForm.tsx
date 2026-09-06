import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { CreateEmployeeInput } from "../types/employee.types";
import { useCreateEmployee } from "../hooks/useCreateEmployee";
import { useEffect } from "react";
import { IconLoader2 } from "@tabler/icons-react";

interface Props {
  addOpen: boolean;
  setAddOpen: (open: boolean) => void;
}

const CreateEmployeeForm = ({ addOpen, setAddOpen }: Props) => {
  const { mutate, isPending, isSuccess } = useCreateEmployee();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateEmployeeInput>({
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      password: "",
      joinDate: new Date().toISOString().split("T")[0],
      territory: "",
      role: "SALESMAN",
      createLogin: true,
    },
  });

  const createLogin = watch("createLogin");

  const onSubmit = (data: CreateEmployeeInput) => {
    mutate(data);
    reset();
  };

  useEffect(() => {
    if (isSuccess) {
      setAddOpen(false);
    }
  }, [isSuccess, setAddOpen]);

  return (
    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="font-heading">Add New Salesman</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label className="text-xs">
                Full Name <span className="text-red-500">*</span>
              </Label>

              <Input
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must contain at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Name cannot exceed 100 characters",
                  },
                })}
                placeholder="Salesman name"
                className="h-8 text-sm"
              />

              {errors.fullName && (
                <p className="text-xs text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="space-y-1.5">
              <Label className="text-xs">
                Mobile <span className="text-red-500">*</span>
              </Label>

              <Input
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })}
                placeholder="10-digit number"
                type="tel"
                maxLength={10}
                className="h-8 text-sm"
              />

              {errors.mobile && (
                <p className="text-xs text-destructive">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>

              <Input
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="email@company.com"
                type="email"
                className="h-8 text-sm"
              />

              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Territory */}
            <div className="space-y-1.5">
              <Label className="text-xs">Territory</Label>

              <Input
                {...register("territory", {
                  minLength: {
                    value: 2,
                    message: "Territory must contain at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Territory cannot exceed 100 characters",
                  },
                })}
                placeholder="Sales territory"
                className="h-8 text-sm"
              />

              {errors.territory && (
                <p className="text-xs text-destructive">
                  {errors.territory.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-xs">
                Password <span className="text-red-500">*</span>
              </Label>

              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="••••••••"
                type="password"
                className="h-8 text-sm"
              />

              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Join date */}
            <div className="space-y-1.5">
              <Label className="text-xs">
                Join Date <span className="text-red-500">*</span>
              </Label>

              <Input
                {...register("joinDate", {
                  required: "Join date is required",
                })}
                type="date"
                className="h-8 text-sm"
              />

              {errors.joinDate && (
                <p className="text-xs text-destructive">
                  {errors.joinDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 justify-end mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setAddOpen(false);
                reset();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <IconLoader2 className="animate-spin w-4 h-4" />
                  <span className="text-sm">Adding...</span>
                </div>
              ) : (
                "Add Salesman"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEmployeeForm;
