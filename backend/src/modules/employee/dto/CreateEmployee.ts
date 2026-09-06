import type { UserRole } from "@/lib/auth/roles.js";

export interface CreateEmployeeDto {
  fullName: string;
  mobile: string;

  designation?: string | undefined;
  department?: string | undefined;
  territory?: string | undefined;

  email?: string | undefined;
  password?: string | undefined;
  role?: UserRole;

  pan?: string | undefined;
  aadhaar?: string | undefined;

  bankAccountNo?: string | undefined;
  ifscCode?: string | undefined;

  salary?: number | undefined;
  joinDate?: Date | undefined;

  createLogin?: boolean | undefined;
}
