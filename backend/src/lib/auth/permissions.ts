import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
  customer: ["create", "read", "update", "delete"],
  product: ["create", "read", "update", "delete"],
  salesOrder: ["create", "read", "update", "cancel", "dispatch"],
  invoice: ["create", "read", "update", "cancel", "export"],
  payment: ["create", "read", "update", "approve"],
  inventory: ["create", "read", "update", "adjust"],
  manufacturing: ["create", "read", "update", "approve"],
  salesman: ["create", "read", "update", "delete"],
  visit: ["create", "read", "update"],
  employee: ["create", "read", "update", "delete"],
  expense: ["create", "read", "update", "approve"],
  complaint: ["create", "read", "update", "resolve"],
  ledger: ["read", "export"],
  report: ["read", "export"],
} as const;

export const ac = createAccessControl(statement);

export const owner = ac.newRole({
  customer: ["create", "read", "update", "delete"],
  product: ["create", "read", "update", "delete"],
  salesOrder: ["create", "read", "update", "cancel", "dispatch"],
  invoice: ["create", "read", "update", "cancel", "export"],
  payment: ["create", "read", "update", "approve"],
  inventory: ["create", "read", "update", "adjust"],
  manufacturing: ["create", "read", "update", "approve"],
  salesman: ["create", "read", "update", "delete"],
  visit: ["create", "read", "update"],
  employee: ["create", "read", "update", "delete"],
  expense: ["create", "read", "update", "approve"],
  complaint: ["create", "read", "update", "resolve"],
  ledger: ["read", "export"],
  report: ["read", "export"],
});

export const accountant = ac.newRole({
  customer: ["read"],
  product: ["read"],
  salesOrder: ["read"],
  invoice: ["create", "read", "update", "cancel", "export"],
  payment: ["create", "read", "update", "approve"],
  inventory: ["read"],
  expense: ["create", "read", "update", "approve"],
  complaint: ["read"],
  ledger: ["read", "export"],
  report: ["read", "export"],
});

export const salesManager = ac.newRole({
  customer: ["create", "read", "update"],
  product: ["read"],
  salesOrder: ["create", "read", "update", "cancel", "dispatch"],
  invoice: ["read", "export"],
  payment: ["read"],
  inventory: ["read"],
  salesman: ["read", "update"],
  visit: ["read", "update"],
  complaint: ["read", "update", "resolve"],
  report: ["read", "export"],
});

export const salesman = ac.newRole({
  customer: ["create", "read", "update"],
  product: ["read"],
  salesOrder: ["create", "read", "update"],
  invoice: ["read"],
  payment: ["create", "read"],
  visit: ["create", "read", "update"],
  complaint: ["create", "read", "update"],
});

export const warehouse = ac.newRole({
  product: ["read"],
  salesOrder: ["read", "update", "dispatch"],
  invoice: ["read"],
  inventory: ["create", "read", "update", "adjust"],
  report: ["read"],
});

export const production = ac.newRole({
  product: ["read"],
  inventory: ["create", "read", "update", "adjust"],
  manufacturing: ["create", "read", "update", "approve"],
  report: ["read"],
});

export const dispatch = ac.newRole({
  customer: ["read"],
  product: ["read"],
  salesOrder: ["read", "dispatch"],
  invoice: ["read"],
  inventory: ["read", "update"],
  report: ["read"],
});
