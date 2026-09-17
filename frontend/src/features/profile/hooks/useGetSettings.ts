import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../api/profile";

export const useGetSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
};
