import type {
  Invoice,
  InvoiceLabel,
  InvoiceStatus,
  PrismaClient,
} from "@/generated/prisma/client.js";
import type {
  InvoiceCreateInput,
  InvoiceUpdateInput,
} from "@/generated/prisma/models.js";

export class InvoiceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: InvoiceCreateInput): Promise<Invoice> {
    return await this.prisma.invoice.create({ data });
  }

  async getInvoiceById(id: string): Promise<Invoice | null> {
    return await this.prisma.invoice.findFirst({
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

  async getInvoiceByLabel(label: InvoiceLabel): Promise<Invoice | null> {
    return await this.prisma.invoice.findFirst({
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
  }

  async getInvoiceByDocNo(docNo: string): Promise<Invoice | null> {
    return await this.prisma.invoice.findFirst({
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

  async getAllInvoices(): Promise<Invoice[] | null> {
    return await this.prisma.invoice.findMany({
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

  async cancelInvoice(id: string): Promise<Invoice | null> {
    return await this.prisma.invoice.update({
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
  ): Promise<Invoice | null> {
    return await this.prisma.invoice.update({
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
  ): Promise<Invoice | null> {
    return await this.prisma.invoice.update({
      where: {
        id,
      },
      data: { data },
    });
  }
}
