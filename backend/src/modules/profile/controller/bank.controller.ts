import type { Request, Response } from "express";
import type { BankService } from "@/modules/profile/services/bank.service.js";
import type { CreateBankInput } from "@/modules/profile/validators/bank.validator.js";
import { BankMapper } from "@/modules/profile/mappers/Bank.mapper.js";

export class BankController {
  constructor(private readonly bankService: BankService) {}

  createOrUpdate = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateBankInput;
    const result = await this.bankService.createOrUpdate(body);
    return res.status(201).json({
      success: true,
      message: "Bank details updated successfully",
      data: BankMapper.toResponse(result),
    });
  };

  getBankDetails = async (_req: Request, res: Response) => {
    const result = await this.bankService.getBankDetails();
    return res.status(200).json({
      success: true,
      message: "Bank details fetched successfully",
      data: result,
    });
  };
}
