import { useQuery } from "@tanstack/react-query";
import { getAllSalesman } from "../api/employee";

export const useGetAllSalesman = () => {
  return useQuery({
    queryKey: ["salesmen"],
    queryFn: getAllSalesman,
  });
};
