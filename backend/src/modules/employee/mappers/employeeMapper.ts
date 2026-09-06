import type { Employee } from "@/generated/prisma/client.js";

export class EmployeeMapper {
  static toResponse(data: Employee) {
    return {
      id: data.id,
      empCode: data.empCode,
    };
  }
}
