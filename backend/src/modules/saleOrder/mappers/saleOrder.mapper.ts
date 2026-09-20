import type { SaleOrder } from "@/generated/prisma/client.js";

export class SaleOrderMapper {
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
