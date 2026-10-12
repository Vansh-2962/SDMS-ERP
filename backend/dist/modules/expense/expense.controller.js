import { ExpenseMapper } from "./expense.mapper.js";
export class ExpenseController {
    service;
    constructor(service) {
        this.service = service;
    }
    create = async (req, res) => {
        const { body } = req.validated;
        const expense = await this.service.create(body);
        return res.status(201).json({
            status: true,
            message: "Expense created successfully",
            data: ExpenseMapper.toResponse(expense),
        });
    };
    getAll = async (_req, res) => {
        const expenses = await this.service.getAll();
        return res.status(200).json({
            status: true,
            message: "Expenses fetched successfully",
            data: ExpenseMapper.toList(expenses),
        });
    };
    getById = async (req, res) => {
        const { params } = req.validated;
        const expense = await this.service.getById(params.id);
        return res.status(200).json({
            status: true,
            message: "Expense fetched successfully",
            data: ExpenseMapper.toResponse(expense),
        });
    };
    update = async (req, res) => {
        const { params, body } = req.validated;
        const expense = await this.service.update(params.id, body, req.auth.user.name);
        return res.status(200).json({
            status: true,
            message: "Expense updated successfully",
            data: ExpenseMapper.toResponse(expense),
        });
    };
    delete = async (req, res) => {
        const { params } = req.validated;
        await this.service.delete(params.id);
        return res.status(200).json({
            status: true,
            message: "Expense deleted successfully",
            data: null,
        });
    };
}
//# sourceMappingURL=expense.controller.js.map