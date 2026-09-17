import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/features/profile/api/profile";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};
