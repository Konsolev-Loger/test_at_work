import { useQuery } from "@tanstack/react-query";
import { usersApi } from "./api";
import type { User } from "./types";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
  });
};

export const useUser = (userId: number | null) => {
  return useQuery<User>({
    queryKey: ["user", userId],
    queryFn: () => usersApi.getUserById(userId!),
  });
};

// пишу для себя так как не использовал раньше TanStack Query.