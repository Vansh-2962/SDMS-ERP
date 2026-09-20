import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export default function BillingLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-background/95 backdrop-blur border-b border-border">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/billing")}
            className="h-8 w-8"
          >
            <IconArrowLeft size={18} />
          </Button>
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-heading font-bold text-sm">
            GS
          </div>
          <div>
            <h1 className="font-heading font-semibold text-sm text-foreground leading-tight">
              GoldSpice Billing
            </h1>
            <p className="text-[10px] text-muted-foreground">
              GST Compliant Document Editor
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:block">
            Auto-saving draft...
          </span>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
            RN
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
