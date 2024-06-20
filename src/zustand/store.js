import { create } from "zustand";

const useGlobalStore = create((set) => ({
  currentUserId: "",
  setCurrentUserId: (userId) => set({ currentUserId: userId }),
}));

export { useGlobalStore };
