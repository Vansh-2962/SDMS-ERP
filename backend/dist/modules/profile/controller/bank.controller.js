import { BankMapper } from "@/modules/profile/mappers/Bank.mapper.js";
export class BankController {
    bankService;
    constructor(bankService) {
        this.bankService = bankService;
    }
    createOrUpdate = async (req, res) => {
        const { body } = req.validated;
        const result = await this.bankService.createOrUpdate(body);
        return res.status(201).json({
            success: true,
            message: "Bank details updated successfully",
            data: BankMapper.toResponse(result),
        });
    };
    getBankDetails = async (_req, res) => {
        const result = await this.bankService.getBankDetails();
        return res.status(200).json({
            success: true,
            message: "Bank details fetched successfully",
            data: result,
        });
    };
}
//# sourceMappingURL=bank.controller.js.map