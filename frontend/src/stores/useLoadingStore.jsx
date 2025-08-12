import { create } from "zustand";

const useLoadingStore = create((set) => ({
  loading: false,
  setLoading: (value) => set({ loading:value }),
}))

export default useLoadingStore;