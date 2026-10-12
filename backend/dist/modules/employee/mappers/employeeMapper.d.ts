import type { Employee } from "@/generated/prisma/client.js";
export declare class EmployeeMapper {
    static toResponse(data: Employee): {
        id: string;
        empCode: number;
        fullName: string;
        mobile: string;
        department: string | null;
        territory: string | null;
        email: string | null;
        role: string;
        pan: string | null;
        aadhar: string | null;
        bankAccNo: string | null;
        IFSC: string | null;
        salary: number | null;
        joinDate: string;
        isActive: boolean;
        userId: string | null;
        createdAt: string;
        updatedAt: string;
    };
    static toList(data: Employee[]): {
        id: string;
        empCode: number;
        fullName: string;
        mobile: string;
        department: string | null;
        territory: string | null;
        email: string | null;
        role: string;
        pan: string | null;
        aadhar: string | null;
        bankAccNo: string | null;
        IFSC: string | null;
        salary: number | null;
        joinDate: string;
        isActive: boolean;
        userId: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
}
//# sourceMappingURL=employeeMapper.d.ts.map