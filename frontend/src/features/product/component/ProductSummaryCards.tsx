import { Card, CardContent } from "@/components/ui/card";
import {
  IconAlertTriangle,
  IconBarcode,
  IconPackage,
} from "@tabler/icons-react";

const ProductSummaryCards = ({
  totalProducts,
  lowStock,
  outOfStock,
  inventoryValue,
}: {
  totalProducts: number;
  lowStock: number;
  outOfStock: number;
  inventoryValue: number;
}) => {
  const summaryCards = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: IconPackage,
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
    {
      label: "Low Stock",
      value: lowStock,
      icon: IconAlertTriangle,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: IconAlertTriangle,
      bg: "bg-red-50",
      color: "text-red-600",
    },
    {
      label: "Inventory Value",
      value: `₹ ${inventoryValue.toFixed(2)}k`,
      icon: IconBarcode,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {summaryCards.map((s) => {
        const Icon = s.icon;
        return (
          <Card
            key={s.label}
            className="border border-border shadow-sm overflow-hidden"
          >
            <CardContent className={`p-4 ${s.bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-heading font-bold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.label}
                  </p>
                </div>
                <Icon size={22} className={s.color} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductSummaryCards;
