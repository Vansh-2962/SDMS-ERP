import { useMutation } from "@tanstack/react-query";
import { saveBankDetails, saveProfile } from "../api/profile";
import { toast } from "sonner";
import { queryClient } from "@/lib/query/query-client";

export const useSaveBankDetails = () => {
  return useMutation({
    mutationFn: saveBankDetails,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bank"] });
      toast.success(data?.message);
    },
  });
};
