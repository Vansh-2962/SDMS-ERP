import { IconRefresh, IconUsersGroup } from "@tabler/icons-react";
import React from "react";

const SalesmenNotFound = () => {
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center rounded-xl border border-dashed border-border bg-background p-6">
      <div className="flex max-w-sm flex-col items-center text-center">
        {/* Icon */}
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <IconUsersGroup
            size={32}
            stroke={1.7}
            className="text-muted-foreground"
          />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          No salesmen found
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          There are no salesmen with recent activity at the moment. Once
          activity is recorded, it will appear here.
        </p>

        {/* Decorative activity line */}
        <div className="mt-6 flex w-full items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <IconRefresh
            size={15}
            stroke={1.8}
            className="text-muted-foreground"
          />
          <div className="h-px flex-1 bg-border" />
        </div>

        <span className="mt-4 text-xs text-muted-foreground">
          Activity updates automatically
        </span>
      </div>
    </div>
  );
};

export default SalesmenNotFound;
