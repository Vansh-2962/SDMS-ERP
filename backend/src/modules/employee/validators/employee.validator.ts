import { USER_ROLES, type UserRole } from "@/lib/auth/roles.js";
import { z } from "zod";

const indianMobileRegex = /^[6-9]\d{9}$/;

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const aadhaarRegex = /^\d{12}$/;

const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

const optionalText = (maxLength: number) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    z.string().trim().max(maxLength).nullable().optional(),
  );

const employeeFields = {
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must contain at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  mobile: z
    .string()
    .trim()
    .regex(indianMobileRegex, "Please enter a valid Indian mobile number"),

  designation: optionalText(100),
  department: optionalText(100),
  territory: optionalText(100),
  email: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === ""
        ? null
        : typeof value === "string"
          ? value.trim().toLowerCase()
          : value,
    z.email("Please enter a valid email address").nullable().optional(),
  ),
  pan: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === ""
        ? null
        : typeof value === "string"
          ? value.trim().toUpperCase()
          : value,
    z.string().regex(panRegex, "Please enter a valid PAN number").nullable().optional(),
  ),
  aadhaar: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    z.string().trim().regex(aadhaarRegex, "Aadhaar number must contain exactly 12 digits").nullable().optional(),
  ),
  bankAccountNo: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    z.string().trim().min(9).max(18).nullable().optional(),
  ),
  ifscCode: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === ""
        ? null
        : typeof value === "string"
          ? value.trim().toUpperCase()
          : value,
    z.string().regex(ifscRegex, "Please enter a valid IFSC code").nullable().optional(),
  ),
  salary: z.preprocess(
    (value) => (value === "" || value === null ? null : value),
    z.coerce.number().finite().min(0).nullable().optional(),
  ),
  role: z.enum(Object.values(USER_ROLES) as [UserRole, ...UserRole[]]),
  joinDate: z.coerce.date({
    error: "Please provide a valid joining date",
  }),
};

export const createEmployeeSchema = z.object({
  body: z
    .object({
      ...employeeFields,
      createLogin: z.boolean().optional(),
      password: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.createLogin === true) {
        if (!data.email) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: "Email is required when creating a login account",
          });
        }

        if (!data.password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password"],
            message: "Password is required when creating a login account",
          });
        }

        if (!data.role) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["role"],
            message: "Role is required when creating a login account",
          });
        }
      }
    }),
});

export const updateEmployeeSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Id is required"),
  }),
  body: z
    .object({
      fullName: employeeFields.fullName.optional(),
      mobile: employeeFields.mobile.optional(),
      department: employeeFields.department,
      territory: employeeFields.territory,
      email: employeeFields.email,
      pan: employeeFields.pan,
      aadhaar: employeeFields.aadhaar,
      bankAccountNo: employeeFields.bankAccountNo,
      ifscCode: employeeFields.ifscCode,
      salary: employeeFields.salary,
      role: employeeFields.role.optional(),
      joinDate: employeeFields.joinDate.optional(),
      isActive: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, "Provide at least one field to update"),
});

export const employeeIdSchema = z.object({
  params: z.object({
    id: z.string().trim().min(1, "Id is required"),
  }),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type EmployeeIdInput = z.infer<typeof employeeIdSchema>;
