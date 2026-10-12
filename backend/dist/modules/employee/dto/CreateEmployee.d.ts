import type { UserRole } from "@/lib/auth/roles.js";
export interface CreateEmployeeDto {
    fullName: string;
    mobile: string;
    designation?: string | null | undefined;
    department?: string | null | undefined;
    territory?: string | null | undefined;
    email?: string | null | undefined;
    password?: string | undefined;
    role: UserRole;
    pan?: string | null | undefined;
    aadhaar?: string | null | undefined;
    bankAccountNo?: string | null | undefined;
    ifscCode?: string | null | undefined;
    salary?: number | null | undefined;
    joinDate: Date;
    createLogin?: boolean | undefined;
}
//# sourceMappingURL=CreateEmployee.d.ts.map