import { Link } from "react-router-dom";

import useUserStore from '../../stores/useUserStore';
import { SubscriptionList } from "../dashboard/SubscriptionList";
import { Logout } from '../user/LogoutBtn';

import "../../../src/index.css";

export const Dashboard = () => {
  const user = useUserStore((state) => state.user);

  if (!user || !user.token) {
    // View when user is not logged in
    return (
      <>
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold">Please log in here</h1>
          <Link to="/login" className="text-blue-600 underline">
            Go to Login
          </Link>
        </div>
      </>
    );
  }

  return (
    // View when logged in
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Admin</h1>
      <p>Welcome {user.name}! Here are your subscriptions.</p>
      <Logout />
      <SubscriptionList />
    </div>

  );
};