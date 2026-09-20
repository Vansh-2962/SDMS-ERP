import type { SaleOrder, SaleOrderStatus } from "@/generated/prisma/client.js";
import type { SaleOrderDTO } from "../dto/saleOrder.dto.js";
import type { SaleOrderRepository } from "../repository/saleOrder.repository.js";
import { logger } from "@/config/logger/index.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";

export class SaleOrderService {
  constructor(private readonly saleOrdeRepository: SaleOrderRepository) {}

  async create(data: SaleOrderDTO): Promise<SaleOrder> {
    logger.debug(data);

    if (!data.items || data.items.length === 0) {
      throw new Error("At least one item is required");
    }

    const customer = await this.saleOrdeRepository.findCustomer(
      data.customerId,
    );

    if (!customer) {
      throw new NotFoundError("Customer");
    }

    if (data.salesmanId) {
      const salesman = await this.saleOrdeRepository.findSalesman(
        data.salesmanId,
      );
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
      throw new Error(
        `Sale order already exists for ${data.customerName} with the same date and total`,
      );
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
          id: data.salesmanId as string,
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

  async getAll(): Promise<SaleOrder[]> {
    return await this.saleOrdeRepository.getAll();
  }

  async getById(id: string): Promise<SaleOrder | null> {
    return await this.saleOrdeRepository.getSaleOrderById(id);
  }

  async delete(id: string): Promise<SaleOrder | null> {
    return await this.saleOrdeRepository.delete(id);
  }

  async updateStatus(
    id: string,
    status: SaleOrderStatus,
  ): Promise<SaleOrder | null> {
    return await this.saleOrdeRepository.updateStatus(id, status);
  }
}
