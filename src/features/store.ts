import { create } from "zustand";
import type { User } from "./types";

interface UsersStore {
  activeUsers: User[];
  archivedUsers: User[];
  hiddenIds: number[];

  setActiveUsers: (users: User[]) => void;
  archiveUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
  hideUser: (id: number) => void;
  updateUser: (updatedUser: User) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  activeUsers: [],
  archivedUsers: [],
  hiddenIds: [],

  // ===============архивирование================================
  setActiveUsers: (users) => set({ activeUsers: users }),
  archiveUser: (id) =>
    set((state) => {
      const user = state.activeUsers.find((u) => u.id === id);
      if (!user) return state; // ищем пользователя, если не нашел ничего не делаем, если нашел удаляем его из активных и добавляем в архив
      return {
        activeUsers: state.activeUsers.filter((u) => u.id !== id),
        archivedUsers: [...state.archivedUsers, user],
      };
    }),
// ================диархивирование================================
  unarchiveUser: (id) =>
    set((state) => {
      const user = state.archivedUsers.find((u) => u.id === id);
      if (!user) return state;
      return {
        archivedUsers: state.archivedUsers.filter((u) => u.id !== id),
        activeUsers: [...state.activeUsers, user],
      };
    }),
// ===========скрытие================================================
  hideUser: (id) =>
    set((state) => ({
      activeUsers: state.activeUsers.filter((u) => u.id !== id),
      hiddenIds: [...state.hiddenIds, id],
    })),
// ===========обновление================================================
  updateUser: (updatedUser) =>
    set((state) => ({
      activeUsers: state.activeUsers.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      ),
      archivedUsers: state.archivedUsers.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      ),
    })),
}));