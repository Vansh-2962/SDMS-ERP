import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { BankType, SaveBankData } from "../types/bank.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankSchema } from "../schema/bank.schema";
import { useEffect } from "react";
import { useSaveBankDetails } from "../hooks/useSaveBankDetails";
import { useGetBankDetails } from "../hooks/useGetBankDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/ui/form";
import ButtonLoader from "@/components/ButtonLoader";
import { IconCircleCheck } from "@tabler/icons-react";
import { formatDate } from "@/lib/helpers";

const Bank = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SaveBankData>({
    resolver: zodResolver(bankSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      bankName: "",
      accountNumber: "",
      accountType: "CURRENT",
      ifsc: "",
      upiId: "",
    },
  });

  const { mutate, isPending } = useSaveBankDetails();
  const { data } = useGetBankDetails();
  const bankData = data?.data as BankType;
  useEffect(() => {
    if (data) {
      reset({
        bankName: bankData?.bankName ?? "",
        accountNumber: bankData?.accountNumber ?? "",
        accountType: bankData?.accountType ?? "CURRENT",
        ifsc: bankData?.ifsc ?? "",
        upiId: bankData?.upiId ?? "",
      });
    }
  }, [data]);

  const onSubmit = (data: SaveBankData) => {
    console.log(data);
    mutate(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="font-heading text-sm font-semibold">
            Bank Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Bank Name</Label>
            <Input
              className="h-8 text-sm"
              placeholder="Enter bank name"
              {...register("bankName")}
            />
            {errors.bankName && (
              <p className="text-xs text-destructive">
                {errors.bankName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Account Number</Label>
            <Input
              className="h-8 text-sm"
              placeholder="Enter account number"
              {...register("accountNumber")}
            />
            {errors.accountNumber && (
              <p className="text-xs text-destructive">
                {errors.accountNumber.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">IFSC Code</Label>
            <Input
              className="h-8 text-sm"
              placeholder="Enter IFSC code"
              {...register("ifsc")}
            />
            {errors.ifsc && (
              <p className="text-xs text-destructive">{errors.ifsc.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <FormField
              control={control}
              name="accountType"
              render={({ field }) => (
                <div className="space-y-1.5">
                  <Label className="text-xs">Account Type</Label>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="SAVINGS">Savings</SelectItem>
                      <SelectItem value="CURRENT">Current</SelectItem>
                    </SelectContent>
                  </Select>

                  {errors.accountType && (
                    <p className="text-xs text-destructive">
                      {errors.accountType.message}
                    </p>
                  )}
                </div>
              )}
            />
            {errors.accountType && (
              <p className="text-xs text-destructive">
                {errors.accountType.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">UPI ID</Label>
            <Input
              className="h-8 text-sm"
              placeholder="Enter UPI ID"
              {...register("upiId")}
            />
            {errors.upiId && (
              <p className="text-xs text-destructive">{errors.upiId.message}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <ButtonLoader text="Saving bank details..." />
            ) : (
              <>
                <IconCircleCheck size={15} className="mr-2" />
                Save Bank Details
              </>
            )}
          </Button>

          {bankData?.updatedAt && (
            <p className="mt-1 text-xs text-muted-foreground">
              Last updated: {formatDate(bankData.updatedAt, true)}
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default Bank;
