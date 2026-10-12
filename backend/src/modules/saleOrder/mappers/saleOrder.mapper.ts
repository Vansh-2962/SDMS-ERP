import type { SaleOrder } from "@/generated/prisma/client.js";
import type { SaleOrderWithDetails } from "../repository/saleOrder.repository.js";

export class SaleOrderMapper {
  static toDetails(data: SaleOrderWithDetails) {
    return {
      id: data.id,
      saleOrderCode: data.saleOrderCode,
      customerId: data.customerId,
      customerName: data.customerName ?? data.customer.shopName,
      date: data.date,
      subtotal: Number(data.subtotal),
      gstAmount: Number(data.gstAmount),
      total: Number(data.total),
      status: data.status,
      salesmanId: data.salesmanId,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      customer: {
        ...data.customer,
        creditLimit: Number(data.customer.creditLimit),
        openingBal: Number(data.customer.openingBal),
      },
      salesman: data.salesman,
      items: data.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productName: item.productName,
        qty: Number(item.qty),
        price: Number(item.price),
        gst: Number(item.gst),
        total: Number(item.total),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        product: item.product,
      })),
    };
  }

  static async toResponse(data: SaleOrder) {
    return {
      id: data.id,
      createdAt: data.createdAt,
    };
  }

  static async toAll(data: any[]) {
    return data.map((d: any) => {
      return {
        id: d.id,
        saleOrderCode: d.saleOrderCode,
        customer: d.customerName,
        date: d.createdAt,
        items: d._count.items,
        salesman: d.salesman.fullName,
        subtotal: d.subtotal,
        gst: d.gstAmount,
        total: d.total,
        status: d.status,
      };
    });
  }
}
