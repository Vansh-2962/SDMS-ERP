import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBuilding, IconCircleCheck } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { ProfileType, SaveProfileData } from "../types/profile.types";
import { Textarea } from "@/components/ui/textarea";
import { profileSchema } from "../schema/profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSaveProfile } from "../hooks/useSaveProfile";
import ButtonLoader from "@/components/ButtonLoader";
import { useGetProfile } from "../hooks/useGetProfile";
import { useEffect } from "react";
import { formatDate } from "@/lib/helpers";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SaveProfileData>({
    resolver: zodResolver(profileSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      id: "",
      companyName: "",
      gstin: "",
      pan: "",
      fssai: "",
      mobile: "",
      email: "",
      website: "",
    },
  });

  const { mutate, isPending } = useSaveProfile();
  const { data } = useGetProfile();
  const profileData = data?.data as ProfileType;
  useEffect(() => {
    if (data) {
      reset({
        id: profileData?.id,
        companyName: profileData?.companyName ?? "",
        gstin: profileData?.GSTIN ?? "",
        pan: profileData?.pan ?? "",
        fssai: profileData?.fssai ?? "",
        mobile: (profileData?.mobile as string) ?? "",
        email: profileData?.email ?? "",
        website: profileData?.website ?? "",
        address: profileData?.address ?? "",
      });
    }
  }, [data]);

  const onSubmit = (data: SaveProfileData) => {
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
          <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
            <IconBuilding size={16} className="text-primary" /> Company
            Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Company Name</Label>
            <Input
              className="h-9"
              placeholder="Enter your company name"
              {...register("companyName")}
            />

            {errors.companyName && (
              <p className="text-xs text-destructive">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">GSTIN</Label>

            <Input
              className="h-9"
              placeholder="Enter your GSTIN"
              {...register("gstin")}
            />

            {errors.gstin && (
              <p className="text-xs text-destructive">{errors.gstin.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">PAN</Label>

            <Input
              className="h-9"
              placeholder="Enter your PAN"
              {...register("pan")}
            />

            {errors.pan && (
              <p className="text-xs text-destructive">{errors.pan.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">FSSAI License</Label>

            <Input
              className="h-9"
              placeholder="Enter your FSSAI License"
              {...register("fssai")}
            />

            {errors.fssai && (
              <p className="text-xs text-destructive">{errors.fssai.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Mobile</Label>

            <Input
              className="h-9"
              type="number"
              placeholder="Enter your mobile number"
              {...register("mobile")}
            />

            {errors.mobile && (
              <p className="text-xs text-destructive">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>

            <Input
              type="email"
              className="h-9"
              placeholder="Enter your email"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Website</Label>

            <Input
              type="url"
              className="h-9"
              placeholder="Enter your website link"
              {...register("website")}
            />

            {errors.website && (
              <p className="text-xs text-destructive">
                {errors.website.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Registered Address</Label>

            <textarea
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-ring"
              rows={3}
              placeholder="Enter your complete address"
              {...register("address")}
            />
            {errors.address && (
              <p className="text-xs text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <ButtonLoader text="Saving company details..." />
            ) : (
              <>
                <IconCircleCheck size={15} className="mr-2" />
                Save Company Details
              </>
            )}
          </Button>

          {profileData?.updatedAt && (
            <p className="mt-1 text-xs text-muted-foreground">
              Last updated: {formatDate(profileData.updatedAt, true)}
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default Profile;
