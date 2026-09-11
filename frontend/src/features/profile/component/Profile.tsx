import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBuilding, IconCircleCheck } from "@tabler/icons-react";

const Profile = () => {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-sm font-semibold flex items-center gap-2">
          <IconBuilding size={16} className="text-primary" /> Company
          Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { label: "Company Name", value: "" },
          { label: "GSTIN", value: "" },
          { label: "PAN", value: "" },
          { label: "FSSAI License", value: "" },
          { label: "Mobile", value: "" },
          { label: "Email", value: "" },
          { label: "Website", value: "" },
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
  );
};

export default Profile;
