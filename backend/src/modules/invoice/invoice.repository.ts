import type {
  Invoice,
  InvoiceLabel,
  InvoiceStatus,
  NumberSequence,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";
import type {
  InvoiceCreateInput,
  InvoiceUpdateInput,
} from "@/generated/prisma/models.js";

export class InvoiceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    data: InvoiceCreateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice> {
    const client = tx ? tx : this.prisma;
    const result = await client.invoice.create({ data });
    return result;
  }

  async updateSequence(
    key: InvoiceLabel,
    tx?: Prisma.TransactionClient,
  ): Promise<NumberSequence> {
    const client = tx ? tx : this.prisma;
    const result = await client.numberSequence.update({
      where: {
        key,
      },
      data: {
        current: {
          increment: 1,
        },
      },
    });
    return result;
  }

  async getInvoiceById(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice | null> {
    const client = tx ? tx : this.prisma;
    return await client.invoice.findFirst({
      where: { id },
      include: {
        customer: {
          select: {
            shopName: true,
            gstNumber: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getInvoiceByLabel(
    label: InvoiceLabel,
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice | null> {
    const client = tx ? tx : this.prisma;
    const result = await client.invoice.findFirst({
      where: {
        label,
      },
      include: {
        customer: {
          select: {
            shopName: true,
            gstNumber: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return result;
  }

  async getInvoiceByDocNo(
    docNo: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice | null> {
    const client = tx ? tx : this.prisma;
    return await client.invoice.findFirst({
      where: {
        docNo,
      },
      include: {
        customer: {
          select: {
            shopName: true,
            gstNumber: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllInvoices(
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice[] | null> {
    const client = tx ? tx : this.prisma;
    return await client.invoice.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: {
          select: {
            shopName: true,
            gstNumber: true,
          },
        },
        items: {
          include: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async cancelInvoice(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice | null> {
    const client = tx ? tx : this.prisma;
    return await client.invoice.update({
      where: {
        id,
      },
      data: {
        status: "CANCELLED",
      },
    });
  }

  async updateInvoiceStatus(
    id: string,
    status: InvoiceStatus,
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice | null> {
    const client = tx ? tx : this.prisma;
    return await client.invoice.update({
      where: {
        id,
      },
      data: {
        status: status,
      },
    });
  }

  async updateInvoice(
    id: string,
    data: InvoiceUpdateInput,
    tx?: Prisma.TransactionClient,
  ): Promise<Invoice | null> {
    const client = tx ? tx : this.prisma;
    return await client.invoice.update({
      where: {
        id,
      },
      data: { data },
    });
  }
}
