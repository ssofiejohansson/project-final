import { create } from 'zustand';

import useLoadingStore from "./useLoadingStore";

const useSubscriptionStore = create((set) => ({
  subscriptions: [],

  setSubscriptions: (subscriptions) => set({ subscriptions }),

  addSubscription: (subscription) => set((state) => ({
    subscriptions: [subscription, ...state.subscriptions],
  })),

  clearSubscriptions: () => set({ subscriptions: [] }),



  //SOFIE ADD
  fetchSubscriptions: async () => {
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;

    if (!token) {
      set({ subscriptions: [] }); // Clear if no token
      return;
    }

    useLoadingStore.getState().setLoading(true);

    try {
      const response = await fetch("https://project-final-xhjy.onrender.com/subscriptions", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch subscriptions");

      const data = await response.json();

      set({ subscriptions: data.response || [] });
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      set({ subscriptions: [] });
    } finally {
      useLoadingStore.getState().setLoading(false);
    }
  },
}));

export default useSubscriptionStore;
