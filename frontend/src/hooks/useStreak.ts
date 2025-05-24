import { get } from "@/api/api";
import { Streak } from "@/types/Streak";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/stores/userStore";

export const useStreak = () => {
  const { user } = useUserStore();
  const { data: streak } = useQuery<Streak[]>({
    queryKey: ["streak"],
    queryFn: () => get("/feeds/streak"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });
  return streak;
};
