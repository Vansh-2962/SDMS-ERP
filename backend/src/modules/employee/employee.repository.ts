import type {
  Prisma,
  Employee,
  PrismaClient,
} from "@/generated/prisma/client.js";

export class EmployeeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: Prisma.EmployeeCreateInput): Promise<Employee> {
    return this.prisma.employee.create({
      data,
    });
  }

  async findById(id: string): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async fetchAll(): Promise<Employee[]> {
    return this.prisma.employee.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return this.prisma.employee.findFirst({
      where: {
        email,
      },
    });
  }

  async findByMobile(mobile: string): Promise<Employee | null> {
    return this.prisma.employee.findFirst({
      where: {
        mobile,
      },
    });
  }

  async fetchAllSalesman(): Promise<Employee[]> {
    return this.prisma.employee.findMany({
      where: {
        role: "SALESMAN",
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: string, data: Prisma.EmployeeUpdateInput): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async deactivate(id: string): Promise<Employee> {
    return this.prisma.employee.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
