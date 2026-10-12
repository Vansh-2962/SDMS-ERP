import type { Employee } from "@/generated/prisma/client.js";
import type { CreateEmployeeDto } from "./dto/CreateEmployee.js";
import type { EmployeeRepository } from "./employee.repository.js";
import { ConflictError } from "@/shared/errors/conflict.error.js";
import { ValidationError } from "@/shared/errors/validation.error.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
import { auth } from "@/lib/auth/auth.js";
import type { UpdateEmployeeInput } from "./validators/employee.validator.js";

export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async create(data: CreateEmployeeDto): Promise<Employee> {
    if (data.email) {
      const existingEmployee = await this.employeeRepository.findByEmail(
        data.email,
      );
      if (existingEmployee) {
        throw new ConflictError("An employee already exists with this email");
      }
    }

    if (data.mobile) {
      const existingMobile = await this.employeeRepository.findByMobile(
        data.mobile,
      );
      if (existingMobile) {
        throw new ConflictError("An employee already exists with this mobile");
      }
    }

    if (data.createLogin && (!data.email || !data.password || !data.role)) {
      throw new ValidationError(
        "Email, password and role are required to create a login account",
        "INVALID_LOGIN_DATA",
      );
    }

    let userId: string | undefined;

    if (data.createLogin) {
      try {
        const result = await auth.api.createUser({
          body: {
            name: data.fullName,
            email: data.email!,
            password: data.password!,
            role: data.role!,
          },
        });

        userId = result.user.id;
      } catch (error) {
        throw new ConflictError("Unable to create authentication account");
      }
    }

    try {
      const employee = await this.employeeRepository.create({
        fullName: data.fullName,
        mobile: data.mobile,
        ...(data.department !== undefined && { department: data.department }),
        ...(data.territory !== undefined && { territory: data.territory }),
        role: data.role,
        ...(data.email !== undefined && { email: data.email }),
        ...(data.pan !== undefined && { pan: data.pan }),
        ...(data.aadhaar !== undefined && { aadhar: data.aadhaar }),
        ...(data.bankAccountNo !== undefined && {
          bankAccNo: data.bankAccountNo,
        }),
        ...(data.ifscCode !== undefined && { IFSC: data.ifscCode }),
        ...(data.salary !== undefined && { salary: data.salary }),
        joinDate: data.joinDate,

        ...(userId
          ? {
              user: {
                connect: {
                  id: userId,
                },
              },
            }
          : {}),
      });

      return employee;
    } catch (error) {
      // ---------------------------------------
      // 5. Compensation
      //
      // Better Auth user was created but
      // Employee creation failed.
      // ---------------------------------------

      if (userId) {
        try {
          await auth.api.removeUser({
            body: {
              userId,
            },
          });
        } catch {
          // Log this properly with Pino.
          // Do not hide the original DB error.
        }
      }

      throw error;
    }
  }

  async fetchAllSalesman(): Promise<Employee[]> {
    return this.employeeRepository.fetchAllSalesman();
  }

  async fetchAll(): Promise<Employee[]> {
    return this.employeeRepository.fetchAll();
  }

  async getById(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findById(id);
    if (!employee) {
      throw new NotFoundError("Employee not found");
    }

    return employee;
  }

  async update(
    id: string,
    data: UpdateEmployeeInput["body"],
  ): Promise<Employee> {
    const employee = await this.getById(id);

    if (data.email) {
      const existingEmployee = await this.employeeRepository.findByEmail(
        data.email,
      );
      if (existingEmployee && existingEmployee.id !== employee.id) {
        throw new ConflictError("An employee already exists with this email");
      }
    }

    if (data.mobile) {
      const existingEmployee = await this.employeeRepository.findByMobile(
        data.mobile,
      );
      if (existingEmployee && existingEmployee.id !== employee.id) {
        throw new ConflictError("An employee already exists with this mobile");
      }
    }

    return this.employeeRepository.update(id, {
      ...(data.fullName !== undefined && { fullName: data.fullName }),
      ...(data.mobile !== undefined && { mobile: data.mobile }),
      ...(data.department !== undefined && { department: data.department }),
      ...(data.territory !== undefined && { territory: data.territory }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.role !== undefined && { role: data.role }),
      ...(data.pan !== undefined && { pan: data.pan }),
      ...(data.aadhaar !== undefined && { aadhar: data.aadhaar }),
      ...(data.bankAccountNo !== undefined && {
        bankAccNo: data.bankAccountNo,
      }),
      ...(data.ifscCode !== undefined && { IFSC: data.ifscCode }),
      ...(data.salary !== undefined && { salary: data.salary }),
      ...(data.joinDate !== undefined && { joinDate: data.joinDate }),
      ...(data.isActive !== undefined && { isActive: data.isActive }),
    });
  }

  async deactivate(id: string): Promise<Employee> {
    await this.getById(id);
    return this.employeeRepository.deactivate(id);
  }
}
