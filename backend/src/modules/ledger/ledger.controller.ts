import type { Request, Response } from "express";
import type { LedgerService } from "./ledger.service.js";
import type {
  CreateLedgerEntryInput,
  GetLedgerEntriesInput,
  LedgerEntryIdInput,
  UpdateLedgerEntryInput,
} from "./ledger.validators.js";

function toResponse(entry: Awaited<ReturnType<LedgerService["getById"]>>) {
  return {
    id: entry.id,
    customerId: entry.customerId,
    date: entry.date.toISOString(),
    particulars: entry.particulars,
    type: entry.type,
    amount: Number(entry.amount),
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
  };
}

export class LedgerController {
  constructor(private readonly service: LedgerService) {}

  create = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateLedgerEntryInput;
    const entry = await this.service.create(body);
    return res.status(201).json({
      status: true,
      message: "Ledger entry created successfully",
      data: toResponse(entry),
    });
  };

  getAll = async (req: Request, res: Response) => {
    const { query } = req.validated as GetLedgerEntriesInput;
    const entries = await this.service.getAll(query.customerId);
    return res.status(200).json({
      status: true,
      message: "Ledger entries fetched successfully",
      data: entries.map(toResponse),
    });
  };

  getById = async (req: Request, res: Response) => {
    const { params } = req.validated as LedgerEntryIdInput;
    const entry = await this.service.getById(params.id);
    return res.status(200).json({
      status: true,
      message: "Ledger entry fetched successfully",
      data: toResponse(entry),
    });
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = req.validated as UpdateLedgerEntryInput;
    const entry = await this.service.update(params.id, body);
    return res.status(200).json({
      status: true,
      message: "Ledger entry updated successfully",
      data: toResponse(entry),
    });
  };

  delete = async (req: Request, res: Response) => {
    const { params } = req.validated as LedgerEntryIdInput;
    await this.service.delete(params.id);
    return res.status(200).json({
      status: true,
      message: "Ledger entry deleted successfully",
      data: null,
    });
  };
}
