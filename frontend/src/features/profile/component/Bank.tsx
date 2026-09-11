import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Bank = () => {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-sm font-semibold">
          Bank Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { label: "Bank Name", value: "State Bank of India" },
          { label: "Account Number", value: "00112233445566" },
          { label: "IFSC Code", value: "SBIN0001234" },
          { label: "Account Type", value: "Current" },
          { label: "UPI ID", value: "goldspice@sbi" },
        ].map(({ label, value }) => (
          <div key={label} className="space-y-1.5">
            <Label className="text-xs">{label}</Label>
            <Input defaultValue={value} className="h-8 text-sm" />
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full">
          Save Bank Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default Bank;
