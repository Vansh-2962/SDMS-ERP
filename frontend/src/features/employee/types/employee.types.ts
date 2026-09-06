import { z } from "zod";

export const USER_ROLES = {
  OWNER: "OWNER",
  ACCOUNTANT: "ACCOUNTANT",
  SALES_MANAGER: "SALES_MANAGER",
  SALESMAN: "SALESMAN",
  WAREHOUSE: "WAREHOUSE",
  PRODUCTION: "PRODUCTION",
  DISPATCH: "DISPATCH",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface CreateEmployeeInput {
  fullName: string;
  mobile: string;

  designation?: string;
  department?: string;
  territory?: string;

  email?: string;
  password?: string;
  role?: UserRole;

  pan?: string;
  aadhaar?: string;

  bankAccountNo?: string;
  ifscCode?: string;

  salary?: number;
  joinDate?: string;

  createLogin?: boolean;
}

export interface Employee {
  fullName: string;
  mobile: string;
  department: string | null;
  territory: string | null;
  email: string | null;
  pan: string | null;
  salary: number | null;
  joinDate: Date;
  role: string;
  id: string;
  empCode: number;
  aadhar: string | null;
  bankAccNo: string | null;
  IFSC: string | null;
  isActive: boolean;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
