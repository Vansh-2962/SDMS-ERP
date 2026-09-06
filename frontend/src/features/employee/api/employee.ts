import { axiosInstance } from "@/config/axios";
import { CreateEmployeeInput, Employee } from "../types/employee.types";

export async function createEmployee(data: CreateEmployeeInput) {
  const res = await axiosInstance.post("/employees", data);
  return res.data;
}

export async function getAllSalesman(): Promise<{ data: Employee[] }> {
  const res = await axiosInstance.get("/employees/salesman");
  return res.data;
}
