import { SubscriptionForm } from "../comp/dashboard/SubscriptionForm";
import { SubscriptionList } from "../comp/dashboard/SubscriptionList";
import { Footer } from "../comp/layout/Footer";
import { Logout } from '../comp/user/LogoutBtn';
import useUserStore from '../stores/useUserStore';

import "../index.css";

export const Admin = () => {
  const user = useUserStore((state) => state.user);

  return (
    <>
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <p>Welcome {user?.name || 'Admin'}! Here are your subscriptions.</p>
        <Logout />
        <SubscriptionForm />
        <SubscriptionList />
      </div>
      <Footer />
    </>
  );
};