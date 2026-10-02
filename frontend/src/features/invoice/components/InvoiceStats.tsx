import { Card, CardContent } from "@/components/ui/card";
import {
  IconFileInvoice,
  IconFileText,
  IconReceiptRefund,
} from "@tabler/icons-react";
import { InvoiceType } from "../types/invoice.types";

const InvoiceStats = ({ invoices }: { invoices: InvoiceType[] }) => {
  const totalInvoiced = invoices?.reduce((acc, invoice: InvoiceType) => {
    return acc + Number(invoice?.grandTotal ?? 0);
  }, 0);

  const totalTaxes = invoices?.reduce((acc, invoice: InvoiceType) => {
    return (
      acc +
      Number(
        Number(invoice?.gst.igst ?? 0) +
          Number(invoice?.gst.cgst ?? 0) +
          Number(invoice?.gst.sgst ?? 0),
      )
    );
  }, 0);

  const totalDocuments = invoices?.length ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {[
        {
          label: "Total Invoiced",
          value: `₹${totalInvoiced?.toFixed(2)?.toLocaleString() ?? 0}`,
          bg: "bg-violet-50",
          color: "text-violet-600",
          icon: IconFileInvoice,
        },
        {
          label: "Amount Collected",
          value: `₹${(0)?.toFixed(0) ?? 0}k`,
          bg: "bg-emerald-50",
          color: "text-emerald-600",
          icon: IconFileText,
        },
        {
          label: "Total Taxes",
          value: `₹${totalTaxes?.toFixed(2)?.toLocaleString() ?? 0}`,
          bg: "bg-amber-50",
          color: "text-amber-600",
          icon: IconFileText,
        },
        {
          label: "Total Documents",
          value: totalDocuments,
          bg: "bg-blue-50",
          color: "text-blue-600",
          icon: IconReceiptRefund,
        },
      ].map((s) => {
        const Icon = s.icon;
        return (
          <Card
            key={s.label}
            className="border border-border shadow-sm overflow-hidden"
          >
            <CardContent className={`p-4 ${s.bg}`}>
              <div className="flex items-center justify-between ">
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

export default InvoiceStats;
