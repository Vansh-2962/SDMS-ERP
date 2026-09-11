import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Settings = () => {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-heading text-sm font-semibold">
          Billing Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {[
          { label: "Invoice Prefix", value: "INV" },
          { label: "Financial Year Start", value: "2024-04-01" },
          { label: "Default Payment Terms (days)", value: "30" },
        ].map(({ label, value }) => (
          <div key={label} className="space-y-1.5">
            <Label className="text-xs">{label}</Label>
            <Input defaultValue={value} className="h-8 text-sm" />
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
