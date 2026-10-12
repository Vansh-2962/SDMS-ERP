import { InvoiceMapper } from "./mappers/invoice.mapper.js";
export class InvoiceController {
    invoiceService;
    constructor(invoiceService) {
        this.invoiceService = invoiceService;
    }
    create = async (req, res) => {
        const body = req.validated["body"];
        const result = await this.invoiceService.create(body);
        return res.status(201).json({
            status: true,
            message: "Invoice created successfully",
            data: InvoiceMapper.toResponse(result),
        });
    };
    getAll = async (_, res) => {
        const result = await this.invoiceService.getAllInvoices();
        return res.status(200).json({
            status: true,
            message: "Invoices fetched successfully",
            data: InvoiceMapper.toList(result),
        });
    };
    getInvoiceById = async (req, res) => {
        const { params } = req.validated;
        const result = await this.invoiceService.getInvoiceById(params.id);
        return res.status(200).json({
            status: true,
            message: "Invoice fetched successfully",
            data: InvoiceMapper.toResponse(result),
        });
    };
}
//# sourceMappingURL=invoice.controller.js.map