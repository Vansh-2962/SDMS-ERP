import { Outlet } from "react-router-dom";
import {
  IconLeaf,
  IconShieldCheck,
  IconChartBar,
  IconTruckDelivery,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconChartBar,
    title: "Real-time Analytics",
    desc: "Track sales, inventory & distributor performance live",
  },
  {
    icon: IconTruckDelivery,
    title: "Field Sales Tracking",
    desc: "GPS-enabled salesman visits and route optimization",
  },
  {
    icon: IconShieldCheck,
    title: "GST-Compliant Billing",
    desc: "Auto GST calculation, e-way bill & QR invoices",
  },
];

const stats = [
  { value: "1,200+", label: "Retailers" },
  { value: "48", label: "Distributors" },
  { value: "₹4.2Cr", label: "Monthly Sales" },
  { value: "99.9%", label: "Uptime" },
];

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[hsl(60_10%_8%)]">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[hsl(262_83%_58%)] opacity-20 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-[hsl(82_38%_28%)] opacity-30 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[hsl(48_96%_53%)] opacity-10 blur-3xl" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(60_6%_85%) 1px, transparent 1px), linear-gradient(90deg, hsl(60_6%_85%) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[hsl(262_83%_65%)] to-[hsl(262_83%_50%)] flex items-center justify-center shadow-lg shadow-violet-900/30">
              <IconLeaf size={24} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-white text-lg leading-tight">
                GoldSpice
              </p>
              <p className="text-xs text-[hsl(82_28%_55%)] leading-tight">
                S&DMS Platform
              </p>
            </div>
          </div>

          {/* Hero text */}
          <div className="max-w-md">
            <h1 className="font-heading text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              The complete{" "}
              <span className="bg-gradient-to-r from-[hsl(48_96%_63%)] to-[hsl(262_83%_70%)] bg-clip-text text-transparent">
                Sales & Distribution
              </span>{" "}
              platform for spice manufacturers
            </h1>
            <p className="text-[hsl(60_6%_70%)] text-base leading-relaxed mb-8">
              Manage manufacturing, distributors, retailers, field sales, GST
              billing, and collections — all in one place.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[hsl(262_83%_58%)]/20 transition-colors">
                    <Icon size={20} className="text-[hsl(262_83%_70%)]" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{title}</p>
                    <p className="text-[hsl(60_6%_60%)] text-xs mt-0.5">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-white/10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-heading text-2xl font-bold text-white">
                  {s.value}
                </p>
                <p className="text-xs text-[hsl(60_6%_55%)] mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background relative">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[hsl(262_83%_65%)] to-[hsl(262_83%_50%)] flex items-center justify-center">
            <IconLeaf size={18} className="text-white" />
          </div>
          <p className="font-heading font-bold text-foreground">GoldSpice</p>
        </div>

        <div className="w-full max-w-md animate-fade-in">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
