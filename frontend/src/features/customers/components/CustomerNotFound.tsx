import { IconRefresh, IconUsersGroup } from "@tabler/icons-react";

const CustomerNotFound = () => {
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
          No customers found
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          You have not added any customers yet.
        </p>
      </div>
    </div>
  );
};

export default CustomerNotFound;
