import { useQuery } from "@tanstack/react-query";
import { getBankDetails } from "../api/profile";

export const useGetBankDetails = () => {
  return useQuery({
    queryKey: ["bank"],
    queryFn: getBankDetails,
  });
};
