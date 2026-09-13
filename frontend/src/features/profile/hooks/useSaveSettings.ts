import { useMutation } from "@tanstack/react-query";
import { saveSettings } from "../api/profile";
import { toast } from "sonner";
import { queryClient } from "@/lib/query/query-client";

export const useSaveSettings = () => {
  return useMutation({
    mutationFn: saveSettings,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success(data?.message);
    },
  });
};
