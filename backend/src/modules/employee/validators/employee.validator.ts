import { USER_ROLES, type UserRole } from "@/lib/auth/roles.js";
import { z } from "zod";

const indianMobileRegex = /^[6-9]\d{9}$/;

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

const aadhaarRegex = /^\d{12}$/;

const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const createEmployeeSchema = z.object({
  body: z
    .object({
      fullName: z
        .string()
        .trim()
        .min(2, "Full name must contain at least 2 characters")
        .max(100, "Full name cannot exceed 100 characters"),

      mobile: z
        .string()
        .trim()
        .regex(indianMobileRegex, "Please enter a valid Indian mobile number"),

      designation: z
        .string()
        .trim()
        .min(2, "Designation must contain at least 2 characters")
        .max(100, "Designation cannot exceed 100 characters")
        .optional(),

      department: z
        .string()
        .trim()
        .min(2, "Department must contain at least 2 characters")
        .max(100, "Department cannot exceed 100 characters")
        .optional(),

      territory: z
        .string()
        .trim()
        .min(2, "Territory must contain at least 2 characters")
        .max(100, "Territory cannot exceed 100 characters")
        .optional(),

      email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Please enter a valid email address")
        .optional(),

      pan: z
        .string()
        .trim()
        .toUpperCase()
        .regex(panRegex, "Please enter a valid PAN number")
        .optional(),

      aadhaar: z
        .string()
        .trim()
        .regex(aadhaarRegex, "Aadhaar number must contain exactly 12 digits")
        .optional(),

      bankAccountNo: z
        .string()
        .trim()
        .min(9, "Please enter a valid bank account number")
        .max(18, "Please enter a valid bank account number")
        .optional(),

      ifscCode: z
        .string()
        .trim()
        .toUpperCase()
        .regex(ifscRegex, "Please enter a valid IFSC code")
        .optional(),

      salary: z.coerce
        .number()
        .positive("Salary must be greater than 0")
        .optional(),

      joinDate: z.coerce.date({
        error: "Please provide a valid joining date",
      }),

      createLogin: z.boolean().optional(),

      password: z.string().optional(),

      role: z.enum(Object.values(USER_ROLES) as [UserRole, ...UserRole[]]),
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

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
