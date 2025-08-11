import { create } from 'zustand';

const useSubscriptionStore = create((set) => ({
  subscriptions: [],

  setSubscriptions: (subscriptions) => set({ subscriptions }),

  addSubscription: (subscription) => set((state) => ({
    subscriptions: [subscription, ...state.subscriptions],
  })),

  clearSubscriptions: () => set({ subscriptions: [] }),
}));

export default useSubscriptionStore;
