import { create } from 'zustand';

const useSubscriptionStore = create((set) => ({
  subscription: null,
  setSubscription: (subscriptionData) => set({ subscription: subscriptionData }),
  clearSubscription: () => set({ subscription: null }),
}));

export default useSubscriptionStore;