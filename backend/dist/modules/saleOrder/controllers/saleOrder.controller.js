import { SaleOrderMapper } from "../mappers/saleOrder.mapper.js";
export class SaleOrderController {
    saleOrderService;
    constructor(saleOrderService) {
        this.saleOrderService = saleOrderService;
    }
    create = async (req, res) => {
        const body = req.validated["body"];
        const result = await this.saleOrderService.create(body);
        return res.status(200).json({
            status: 201,
            message: "Sale Order created successfully",
            data: SaleOrderMapper.toResponse(result),
        });
    };
    getAll = async (req, res) => {
        const result = await this.saleOrderService.getAll();
        return res.status(201).json({
            status: 201,
            message: "Sale Orders fetched successfully",
            data: result,
        });
    };
    getById = async (req, res) => {
        const { params } = req.validated;
        const result = await this.saleOrderService.getById(params.id);
        return res.status(200).json({
            status: 200,
            message: "Sale Order fetched successfully",
            data: SaleOrderMapper.toDetails(result),
        });
    };
    delete = async (req, res) => {
        const { params } = req.validated;
        const result = await this.saleOrderService.delete(params.id);
        return res.status(200).json({
            status: 200,
            message: "Sale Order deleted successfully",
            data: result,
        });
    };
    updateStatus = async (req, res) => {
        const { params, body } = req.validated;
        const result = await this.saleOrderService.updateStatus(params.id, body.status);
        return res.status(200).json({
            status: 200,
            message: "Sale Order status updated successfully",
            data: result,
        });
    };
}
//# sourceMappingURL=saleOrder.controller.js.map