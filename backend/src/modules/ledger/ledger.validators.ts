import { z } from "zod";

const entryFields = {
  date: z.coerce.date(),
  particulars: z.string().trim().min(1).max(500),
  type: z.enum(["DEBIT", "CREDIT"]),
  amount: z.coerce.number().finite().positive("Amount must be greater than zero"),
};

const idParams = z.object({
  id: z.string().trim().min(1, "Ledger entry id is required"),
});

export const createLedgerEntrySchema = z.object({
  body: z.object({
    customerId: z.string().trim().min(1, "Customer id is required"),
    ...entryFields,
  }),
});

export const getLedgerEntriesSchema = z.object({
  query: z.object({
    customerId: z.string().trim().min(1, "Customer id is required"),
  }),
});

export const updateLedgerEntrySchema = z.object({
  params: idParams,
  body: z
    .object({
      date: entryFields.date.optional(),
      particulars: entryFields.particulars.optional(),
      type: entryFields.type.optional(),
      amount: entryFields.amount.optional(),
    })
    .refine((body) => Object.keys(body).length > 0, "At least one field is required"),
});

export const ledgerEntryIdSchema = z.object({ params: idParams });

export type CreateLedgerEntryInput = z.infer<typeof createLedgerEntrySchema>;
export type GetLedgerEntriesInput = z.infer<typeof getLedgerEntriesSchema>;
export type UpdateLedgerEntryInput = z.infer<typeof updateLedgerEntrySchema>;
export type LedgerEntryIdInput = z.infer<typeof ledgerEntryIdSchema>;
