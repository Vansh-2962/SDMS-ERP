import type { Request, Response } from "express";
import type { InvoiceService } from "./invoice.service.js";
import type { CreateInvoiceDTO } from "./invoice.dto.js";
import { InvoiceMapper } from "./mappers/invoice.mapper.js";
import type { Invoice } from "@/generated/prisma/client.js";
import type { GetInvoiceByIdInput } from "./validators/invoice.validators.js";
import type { InvoiceWithRelations } from "./invoice.types.js";

export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  create = async (req: Request, res: Response) => {
    const body = req.validated["body"] as CreateInvoiceDTO;
    const result = await this.invoiceService.create(body);
    return res.status(201).json({
      status: true,
      message: "Invoice created successfully",
      data: InvoiceMapper.toResponse(result as Invoice),
    });
  };

  getAll = async (_: Request, res: Response) => {
    const result = await this.invoiceService.getAllInvoices();
    return res.status(200).json({
      status: true,
      message: "Invoices fetched successfully",
      data: InvoiceMapper.toList(result as InvoiceWithRelations[]),
    });
  };

  getInvoiceById = async (req: Request, res: Response) => {
    const { params } = req.validated as GetInvoiceByIdInput;
    const result = await this.invoiceService.getInvoiceById(params.id);
    return res.status(200).json({
      status: true,
      message: "Invoice fetched successfully",
      data: InvoiceMapper.toResponse(result as Invoice),
    });
  };
}
