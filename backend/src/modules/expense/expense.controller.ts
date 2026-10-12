import type { Request, Response } from "express";
import { ExpenseMapper } from "./expense.mapper.js";
import type { ExpenseService } from "./expense.service.js";
import type {
  CreateExpenseInput,
  ExpenseIdInput,
  UpdateExpenseInput,
} from "./expense.validators.js";

export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  create = async (req: Request, res: Response) => {
    const { body } = req.validated as CreateExpenseInput;
    const expense = await this.service.create(body);
    return res.status(201).json({
      status: true,
      message: "Expense created successfully",
      data: ExpenseMapper.toResponse(expense),
    });
  };

  getAll = async (_req: Request, res: Response) => {
    const expenses = await this.service.getAll();
    return res.status(200).json({
      status: true,
      message: "Expenses fetched successfully",
      data: ExpenseMapper.toList(expenses),
    });
  };

  getById = async (req: Request, res: Response) => {
    const { params } = req.validated as ExpenseIdInput;
    const expense = await this.service.getById(params.id);
    return res.status(200).json({
      status: true,
      message: "Expense fetched successfully",
      data: ExpenseMapper.toResponse(expense),
    });
  };

  update = async (req: Request, res: Response) => {
    const { params, body } = req.validated as UpdateExpenseInput;
    const expense = await this.service.update(
      params.id,
      body,
      req.auth.user.name,
    );
    return res.status(200).json({
      status: true,
      message: "Expense updated successfully",
      data: ExpenseMapper.toResponse(expense),
    });
  };

  delete = async (req: Request, res: Response) => {
    const { params } = req.validated as ExpenseIdInput;
    await this.service.delete(params.id);
    return res.status(200).json({
      status: true,
      message: "Expense deleted successfully",
      data: null,
    });
  };
}
