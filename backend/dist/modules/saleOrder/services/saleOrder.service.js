import { logger } from "@/config/logger/index.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
export class SaleOrderService {
    saleOrdeRepository;
    constructor(saleOrdeRepository) {
        this.saleOrdeRepository = saleOrdeRepository;
    }
    async create(data) {
        logger.debug(data);
        if (!data.items || data.items.length === 0) {
            throw new Error("At least one item is required");
        }
        const customer = await this.saleOrdeRepository.findCustomer(data.customerId);
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        if (data.salesmanId) {
            const salesman = await this.saleOrdeRepository.findSalesman(data.salesmanId);
            if (!salesman) {
                throw new NotFoundError("Salesman");
            }
        }
        if (!customer) {
            throw new NotFoundError("Customer");
        }
        const existingOrder = await this.saleOrdeRepository.findDuplicate({
            customerId: data.customerId,
            date: new Date(data.date),
            total: data.total,
        });
        if (existingOrder) {
            throw new Error(`Sale order already exists for ${data.customerName} with the same date and total`);
        }
        const saleOrder = await this.saleOrdeRepository.create({
            customer: {
                connect: {
                    id: data.customerId,
                },
            },
            customerName: data.customerName,
            date: new Date(data.date),
            subtotal: data.subtotal,
            gstAmount: data.gstAmount,
            total: data.total,
            status: data.status,
            salesman: {
                connect: {
                    id: data.salesmanId,
                },
            },
            items: {
                create: data.items.map((item) => ({
                    gst: item.gst,
                    price: item.price,
                    productId: item.productId,
                    productName: item.productName,
                    qty: item.qty,
                    total: item.total,
                })),
            },
        });
        return saleOrder;
    }
    async getAll() {
        return await this.saleOrdeRepository.getAll();
    }
    async getById(id) {
        const saleOrder = await this.saleOrdeRepository.getSaleOrderById(id);
        if (!saleOrder) {
            throw new NotFoundError("Sale order");
        }
        return saleOrder;
    }
    async delete(id) {
        return await this.saleOrdeRepository.delete(id);
    }
    async updateStatus(id, status) {
        return await this.saleOrdeRepository.updateStatus(id, status);
    }
}
//# sourceMappingURL=saleOrder.service.js.map