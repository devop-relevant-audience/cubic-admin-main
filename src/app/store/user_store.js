import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const store = (set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: (user) => {
    set({ user, isAuthenticated: true, isLoading: false });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
});

export const userStore = create(
  persist(store, {
    name: "userStore", // unique name
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  })
);
