import type {
  Customer,
  Employee,
  Prisma,
  PrismaClient,
  SaleOrder,
  SaleOrderStatus,
} from "@/generated/prisma/client.js";

export type SaleOrderWithDetails = Prisma.SaleOrderGetPayload<{
  include: {
    customer: {
      select: {
        id: true;
        customerCode: true;
        shopName: true;
        ownerName: true;
        type: true;
        gstNumber: true;
        pan: true;
        fssai: true;
        status: true;
        mobile: true;
        whatsapp: true;
        email: true;
        street: true;
        state: true;
        stateCode: true;
        district: true;
        pincode: true;
        latitude: true;
        longitude: true;
        salesTerritory: true;
        assignedSalesmanId: true;
        assignedSalesman: {
          select: {
            empCode: true;
            fullName: true;
          };
        };
        paymentTerms: true;
        creditLimit: true;
        openingBal: true;
        createdAt: true;
        updatedAt: true;
      };
    };
    salesman: {
      select: {
        id: true;
        empCode: true;
        fullName: true;
        role: true;
        mobile: true;
        email: true;
      };
    };
    items: {
      include: {
        product: {
          select: {
            id: true;
            code: true;
            name: true;
            hsn: true;
            unit: true;
            netWeight: true;
            category: true;
            brand: true;
            barcode: true;
            type: true;
            form: true;
            shelfLife: true;
          };
        };
      };
    };
  };
}>;

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

  async getSaleOrderById(id: string): Promise<SaleOrderWithDetails | null> {
    return this.prisma.saleOrder.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        customer: {
          select: {
            id: true,
            customerCode: true,
            shopName: true,
            ownerName: true,
            type: true,
            gstNumber: true,
            pan: true,
            fssai: true,
            status: true,
            mobile: true,
            whatsapp: true,
            email: true,
            street: true,
            state: true,
            stateCode: true,
            district: true,
            pincode: true,
            latitude: true,
            longitude: true,
            salesTerritory: true,
            assignedSalesmanId: true,
            assignedSalesman: {
              select: {
                empCode: true,
                fullName: true,
              },
            },
            paymentTerms: true,
            creditLimit: true,
            openingBal: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        salesman: {
          select: {
            id: true,
            empCode: true,
            fullName: true,
            role: true,
            mobile: true,
            email: true,
          },
        },
        items: {
          orderBy: { createdAt: "asc" },
          include: {
            product: {
              select: {
                id: true,
                code: true,
                name: true,
                hsn: true,
                unit: true,
                netWeight: true,
                category: true,
                brand: true,
                barcode: true,
                type: true,
                form: true,
                shelfLife: true,
              },
            },
          },
        },
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
