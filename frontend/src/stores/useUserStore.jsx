import { create } from 'zustand';

const storedUser = JSON.parse(localStorage.getItem("user") || "null");

const useUserStore = create((set) => ({
  message: [],
  status: [],  
  user: storedUser && storedUser.token ? storedUser : null,
  
  setUser: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData });
  },
  
  clearUser: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken"); 
    set({ user: null });
  },
}));

export default useUserStore;