import type {
  Customer,
  Prisma,
  PrismaClient,
} from "@/generated/prisma/client.js";
import type { CustomerWithSalesman } from "./customer.types.js";

export class CustomerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return await this.prisma.customer.create({ data });
  }

  async getAllCustomers(): Promise<CustomerWithSalesman[] | null> {
    return await this.prisma.customer.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        assignedSalesman: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return await this.prisma.customer.findFirst({
      where: {
        id,
      },
    });
  }

  async getCustomerByGST(gst: string): Promise<Customer | null> {
    return await this.prisma.customer.findFirst({
      where: {
        gstNumber: gst,
      },
    });
  }

  async getCustomerByPAN(pan: string): Promise<Customer | null> {
    return await this.prisma.customer.findFirst({
      where: {
        pan,
      },
    });
  }

  async deactivateCustomer(id: string): Promise<Customer | null> {
    return await this.prisma.customer.update({
      where: {
        id,
      },
      data: {
        status: "INACTIVE",
      },
    });
  }

  async update(
    id: string,
    data: Prisma.CustomerUpdateInput,
  ): Promise<Customer> {
    return await this.prisma.customer.update({
      where: {
        id,
      },
      data: data,
    });
  }
}
