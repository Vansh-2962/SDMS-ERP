import type {
  Customer,
  Employee,
  Prisma,
  PrismaClient,
  SaleOrder,
  SaleOrderStatus,
} from "@/generated/prisma/client.js";

export class SaleOrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.SaleOrderCreateInput): Promise<SaleOrder> {
    return await this.prisma.saleOrder.create({ data });
  }

  async getAll(): Promise<SaleOrder[]> {
    return await this.prisma.saleOrder.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            items: true,
          },
        },
        salesman: {
          select: {
            fullName: true,
          },
        },
        customer: {
          select: {
            shopName: true,
          },
        },
      },
    });
  }

  async getSaleOrderById(id: string): Promise<SaleOrder | null> {
    return await this.prisma.saleOrder.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async getSaleOrderByCode(code: number): Promise<SaleOrder | null> {
    return await this.prisma.saleOrder.findFirst({
      where: {
        saleOrderCode: code,
        isActive: true,
      },
    });
  }

  async delete(id: string): Promise<SaleOrder | null> {
    return await this.prisma.saleOrder.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });
  }

  async findCustomer(id: string): Promise<Customer | null> {
    return await this.prisma.customer.findFirst({
      where: {
        id,
      },
    });
  }

  async findSalesman(id: string): Promise<Employee | null> {
    return await this.prisma.employee.findFirst({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    data: Prisma.SaleOrderCreateInput,
  ): Promise<SaleOrder> {
    return await this.prisma.saleOrder.update({
      where: {
        id,
      },
      data: { data },
    });
  }

  async findDuplicate({
    customerId,
    date,
    total,
  }: {
    customerId: string;
    date: Date;
    total: number;
  }): Promise<SaleOrder | null> {
    return await this.prisma.saleOrder.findFirst({
      where: {
        customerId,
        date,
        total,
        isActive: true,
      },
    });
  }

  async updateStatus(id: string, status: SaleOrderStatus): Promise<SaleOrder> {
    return await this.prisma.saleOrder.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
