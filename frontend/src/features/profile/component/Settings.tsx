import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { SaveSettingsData, SettingsType } from "../types/settings.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSaveSettings } from "../hooks/useSaveSettings";
import { useGetSettings } from "../hooks/useGetSettings";
import { useEffect } from "react";
import { settingsSchema } from "../schema/settingsSchema";
import { formatDate } from "@/lib/helpers";
import ButtonLoader from "@/components/ButtonLoader";
import { IconCircleCheck } from "@tabler/icons-react";

const Settings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<SaveSettingsData>({
    resolver: zodResolver(settingsSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      finYearStart: "",
      invPrefix: "",
      paymentTerms: 0,
    },
  });

  const { mutate, isPending } = useSaveSettings();
  const { data } = useGetSettings();
  const settingsData = data?.data as SettingsType;
  console.log(settingsData);
  useEffect(() => {
    if (data) {
      reset({
        invPrefix: settingsData?.invPrefix ?? "",
        finYearStart: settingsData.finYearStart
          ? new Date(settingsData.finYearStart).toISOString().split("T")[0]
          : undefined,
        paymentTerms: settingsData?.paymentTerms ?? 0,
      });
    }
  }, [data]);

  const onSubmit = (data: SaveSettingsData) => {
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
            Billing Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Invoice Prefix</Label>

            <Input
              className="h-8 text-sm"
              placeholder="Enter invoice prefix"
              {...register("invPrefix")}
            />

            {errors.invPrefix && (
              <p className="text-xs text-destructive">
                {errors.invPrefix.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Financial Year Start</Label>

            <Input
              type="date"
              className="h-8 text-sm"
              {...register("finYearStart")}
            />

            {errors.finYearStart && (
              <p className="text-xs text-destructive">
                {errors.finYearStart.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Default Payment Terms (days)</Label>

            <Input
              type="number"
              className="h-8 text-sm"
              placeholder="Enter payment terms"
              {...register("paymentTerms", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
            />

            {errors.paymentTerms && (
              <p className="text-xs text-destructive">
                {errors.paymentTerms.message}
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" className="w-full" disabled={isPending}>
            {isPending ? (
              <ButtonLoader text="Saving settings..." />
            ) : (
              <>
                <IconCircleCheck size={15} className="mr-2" />
                Save Settings
              </>
            )}
          </Button>
          {settingsData?.updatedAt && (
            <p className="mt-1 text-xs text-muted-foreground">
              Last updated: {formatDate(settingsData.updatedAt, true)}
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default Settings;
