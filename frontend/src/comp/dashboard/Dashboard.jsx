import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmailForm from "../EmailForm";
import Linegraph from "./Linegraph";
import useUserStore from "../../stores/useUserStore";
import { SubscriptionList } from "../dashboard/SubscriptionList";
import { Logout } from "../user/LogoutBtn";
import useSubscriptionStore from "../../stores/useSubscriptionStore";
import "../../../src/index.css";

export const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const subscriptions = useSubscriptionStore((state) => state.subscriptions);
  const fetchSubscriptions = useSubscriptionStore(
    (state) => state.fetchSubscriptions
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token) {
      fetchSubscriptions(user.token).finally(() => setLoading(false));
    }
  }, [user, fetchSubscriptions]);

  if (!user || !user.token) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">Please log in here</h1>
        <Link to="/login" className="text-blue-600 underline">
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="p-6 text-center">Loading subscriptions...</div>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Admin</h1>
      <p>Welcome {user.name}! Here are your subscriptions.</p>
      <Logout />
      <SubscriptionList subscriptions={subscriptions} />
      <Linegraph subscriptions={subscriptions} />
    </div>
  );
};
