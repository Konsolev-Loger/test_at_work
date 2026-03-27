import type { User } from "./types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  getUserById: async (id: number): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  },

  updateUser: async (user: User): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },
};