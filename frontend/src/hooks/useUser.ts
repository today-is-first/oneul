import { useQuery } from "@tanstack/react-query";
import { get } from "@/api/api";
import { User } from "@/types/User";

export const useMeQuery = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: () => get("/users/me"),
    refetchOnWindowFocus: true,
  });
};
