import { Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import useUserStore from "../../stores/useUserStore";
import { SubscriptionList } from "../dashboard/SubscriptionList";
import { Linegraph } from "./Linegraph";

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

    // View when logged in
    <div className="grid mt-16 min-h-[82vh] w-full place-items-stretch p-8">
      <div className="container mx-auto px-4 text-center">
        <Typography
          variant="h1"
          color="blue-gray"
          className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
        > Welcome {user.name}! Here are your {" "}
          <span className="text-green-500 leading-snug ">subscriptions</span>.
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 lg:text-lg text-base mb-8"
        >
          View and manage your subscriptions easily.
        </Typography>
        <SubscriptionList subscriptions={subscriptions} />
        <Linegraph subscriptions={subscriptions} />
      </div>
    </div>
  );
};
