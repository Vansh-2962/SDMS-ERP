import { IconRefresh, IconShoppingCart } from "@tabler/icons-react";

const SaleOrderNotFound = () => {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-xl border border-dashed border-border bg-background p-6">
      <div className="flex max-w-sm flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <IconShoppingCart
            size={32}
            stroke={1.7}
            className="text-muted-foreground"
          />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          No orders found
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          There are no orders available at the moment. Once orders are added,
          they will appear here.
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
          Orders will appear here once they’re added
        </span>
      </div>
    </div>
  );
};

export default SaleOrderNotFound;
