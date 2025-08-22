import { create } from "zustand";

import { BaseURL } from "../comp/BaseURL";
import { SubscriptionModal } from "../comp/dashboard/SubscriptionModal";
import useLoadingStore from "./useLoadingStore";

const useSubscriptionStore = create((set) => ({
  subscriptions: [],
  message: null,
  status: null,

  setSubscriptions: (subscriptions) => set({ subscriptions }),

  //SubscriptionSave//
  //state
  isSaveOpen: false,
  selectedSubSave: null,
  //actions
  openSaveDialog: (subscription) => set({ isSaveOpen: true, selectedSubSave: subscription }),
  closeSaveDialog: () => set({ isSaveOpen: false, selectedSubSave: null }),
  ////

  //SubscriptionModal
  //state
  isModalOpen: false,
  selectedSub: null,
  //actions
  openModalDialog: (subscription) => set({ isModalOpen: true, selectedSub: subscription || null}),
  closeModalDialog: () => set({ isModalOpen: false, selectedSub: null }),
  ////
  
  addSubscription: (subscription) => set((state) => ({
    subscriptions: [subscription, ...state.subscriptions],
  })),

  // SOFIE ADD: update sub
  updateSubscription: (updatedSub) =>
    set((state) => ({
      subscriptions: state.subscriptions.map((sub) =>
        sub._id === updatedSub._id ? updatedSub : sub
      ),
    })),

  clearSubscriptions: () => set({ subscriptions: [] }),

  //SOFIE ADD
  fetchSubscriptions: async () => {
    const urlAPI = `${BaseURL}/subscriptions`

    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;

    if (!token) {
      set({ subscriptions: [] }); // Clear if no token
      return;
    }

    useLoadingStore.getState().setLoading(true);

    try {
      const response = await fetch(`${urlAPI}`, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      //if (!response.ok) throw new Error("Failed to fetch subscriptions");
      if (!response.ok) {
        // Try to parse backend message
        let errorMessage = "Failed to fetch subscriptions";
        try {
          const errorData = await response.json();
          if (errorData?.message) errorMessage = errorData.message;
        } catch (_) {
          // ignore JSON parse errors
        }

        set({ subscriptions: [], message: errorMessage, status: response.status });
        return;
      }

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
