import { create } from 'zustand';

const storedUser = JSON.parse(localStorage.getItem("user") || "null");

const useUserStore = create((set) => ({
  message: [],
  status: [],
  //user: null,
  user: storedUser && storedUser.token ? storedUser : null,

  //setUser: (userData) => set({ user: userData }),
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },

  //clearUser: () => set({ user: null }),
  clearUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken"); // if stored separately
    set({ user: null });
  },
}));

export default useUserStore;