import { axiosInstance } from "@/config/axios";
import {
  CreateEmployeeInput,
  Employee,
  UpdateEmployeeInput,
} from "../types/employee.types";

type EmployeeResponse = { success: boolean; data: Employee };
type EmployeeListResponse = { success: boolean; data: Employee[] };

export async function createEmployee(
  data: CreateEmployeeInput,
): Promise<EmployeeResponse> {
  const res = await axiosInstance.post("/employees", data);
  return res.data;
}

export async function getAllEmployees(): Promise<EmployeeListResponse> {
  const res = await axiosInstance.get("/employees");
  return res.data;
}

export async function getEmployeeById(
  id: string,
): Promise<EmployeeResponse> {
  const res = await axiosInstance.get(`/employees/${id}`);
  return res.data;
}

export async function updateEmployee({
  id,
  ...data
}: UpdateEmployeeInput & { id: string }): Promise<EmployeeResponse> {
  const res = await axiosInstance.patch(`/employees/${id}`, data);
  return res.data;
}

export async function deactivateEmployee(
  id: string,
): Promise<EmployeeResponse> {
  const res = await axiosInstance.delete(`/employees/${id}`);
  return res.data;
}

export async function getAllSalesman(): Promise<{ data: Employee[] }> {
  const res = await axiosInstance.get("/employees/salesman");
  return res.data;
}
