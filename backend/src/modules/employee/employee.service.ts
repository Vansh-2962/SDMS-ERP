import type { Employee } from "@/generated/prisma/client.js";
import type { CreateEmployeeDto } from "./dto/CreateEmployee.js";
import type { EmployeeRepository } from "./employee.repository.js";
import { ConflictError } from "@/shared/errors/conflict.error.js";
import { ValidationError } from "@/shared/errors/validation.error.js";
import { auth } from "@/lib/auth/auth.js";
import type { UserRole } from "@/lib/auth/roles.js";

export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async create(data: CreateEmployeeDto): Promise<Employee> {
    if (data.email) {
      const existingEmployee = await this.employeeRepository.findByEmail(
        data.email,
      );
      if (existingEmployee) {
        throw new ConflictError("Employee already exisits with this email");
      }
    }

    if (data.mobile) {
      const existingMobile = await this.employeeRepository.findByMobile(
        data.mobile,
      );
      if (existingMobile) {
        throw new ConflictError("Employee already exisits with this mobile");
      }
    }

    const hasAnyLoginField =
      Boolean(data.email) || Boolean(data.password) || Boolean(data.role);

    const hasAllLoginFields =
      Boolean(data.email) && Boolean(data.password) && Boolean(data.role);

    if (hasAnyLoginField && !hasAllLoginFields) {
      throw new ValidationError(
        "Email, password and role are required to create a login account",
        "INVALID_LOGIN_DATA",
      );
    }

    let userId: string | undefined;

    if (hasAllLoginFields) {
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

        department: data.department ? data.department : "",
        territory: data.territory ? data.territory : "",

        role: data.role as UserRole,

        email: data.email ? data.email : "",

        pan: data.pan ? data.pan : "",
        aadhar: data.aadhaar ? data.aadhaar : "",

        bankAccNo: data.bankAccountNo ? data.bankAccountNo : "",
        IFSC: data.ifscCode ? data.ifscCode : "",

        salary: data.salary ? data.salary : 0,
        joinDate: data.joinDate as Date,

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
}
