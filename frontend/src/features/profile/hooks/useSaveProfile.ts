import { useMutation } from "@tanstack/react-query";
import { saveProfile } from "../api/profile";
import { toast } from "sonner";
import { queryClient } from "@/lib/query/query-client";

export const useSaveProfile = () => {
  return useMutation({
    mutationFn: saveProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(data?.message || "Profile saved");
    },
  });
};
