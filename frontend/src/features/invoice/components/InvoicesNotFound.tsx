import { IconFileInvoice, IconRefresh } from "@tabler/icons-react";

const InvoicesNotFound = () => {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-xl border border-dashed border-border bg-background p-6">
      <div className="flex max-w-sm flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <IconFileInvoice
            size={32}
            stroke={1.7}
            className="text-muted-foreground"
          />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          No invoices found
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          There are no invoices available at the moment. Once invoices are
          created, they will appear here.
        </p>

        <div className="mt-6 flex w-full items-center gap-2">
          <div className="h-px flex-1 bg-border" />

          <IconRefresh
            size={15}
            stroke={1.8}
            className="text-muted-foreground"
          />

          <div className="h-px flex-1 bg-border" />
        </div>

        <span className="mt-3 block text-center text-xs text-muted-foreground">
          Invoices will appear here once they’re created
        </span>
      </div>
    </div>
  );
};

export default InvoicesNotFound;
