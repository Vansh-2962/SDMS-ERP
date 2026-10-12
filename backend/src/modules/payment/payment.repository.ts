import type {
  Payment,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";
import type { PaymentWithInvoice } from "./payment.types.js";

const paymentInclude = {
  invoice: {
    include: {
      customer: {
        select: {
          shopName: true,
        },
      },
    },
  },
} satisfies Prisma.PaymentInclude;

export class PaymentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.PaymentCreateInput): Promise<PaymentWithInvoice> {
    return this.prisma.payment.create({
      data,
      include: paymentInclude,
    });
  }

  async getAll(): Promise<PaymentWithInvoice[]> {
    return this.prisma.payment.findMany({
      where: { deletedAt: null },
      include: paymentInclude,
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(id: string): Promise<PaymentWithInvoice | null> {
    return this.prisma.payment.findFirst({
      where: { id, deletedAt: null },
      include: paymentInclude,
    });
  }

  async invoiceExists(id: string): Promise<boolean> {
    const invoice = await this.prisma.invoice.findUnique({
      where: { id },
      select: { id: true },
    });
    return invoice !== null;
  }

  async update(
    id: string,
    data: Prisma.PaymentUpdateInput,
  ): Promise<PaymentWithInvoice> {
    return this.prisma.payment.update({
      where: { id },
      data,
      include: paymentInclude,
    });
  }

  async softDelete(id: string): Promise<Payment> {
    return this.prisma.payment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
