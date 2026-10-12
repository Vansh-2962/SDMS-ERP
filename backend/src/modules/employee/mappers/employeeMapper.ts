import type { Employee } from "@/generated/prisma/client.js";

export class EmployeeMapper {
  static toResponse(data: Employee) {
    return {
      id: data.id,
      empCode: data.empCode,
      fullName: data.fullName,
      mobile: data.mobile,
      department: data.department,
      territory: data.territory,
      email: data.email,
      role: data.role,
      pan: data.pan,
      aadhar: data.aadhar,
      bankAccNo: data.bankAccNo,
      IFSC: data.IFSC,
      salary: data.salary === null ? null : Number(data.salary),
      joinDate: data.joinDate.toISOString(),
      isActive: data.isActive,
      userId: data.userId,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
    };
  }

  static toList(data: Employee[]) {
    return data.map((employee) => this.toResponse(employee));
  }
}
