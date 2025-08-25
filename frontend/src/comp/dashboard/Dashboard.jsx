import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useSubscriptionStore from "../../stores/useSubscriptionStore";
import useUserStore from "../../stores/useUserStore";
import { SubscriptionList } from "../dashboard/SubscriptionList";
import { Btn } from "../layout/Btn"
import { Loader } from "../layout/Loader";
import { DashboardHeader } from "./DashboardHeader";
import { Linegraph } from "./Linegraph";
import { Stats } from "./Stats";
import { SubscriptionSave } from "./SubscriptionSave";

import "../../../src/index.css";

export const Dashboard = () => {
  const navigate = useNavigate();
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
      <section className="flex items-center justify-center min-h-[80vh] px-4">
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
          <CardBody className="flex flex-col items-center text-center space-y-6">
            <Typography variant="h4" color="blue-gray">
              Please log in
            </Typography>

            <Typography color="gray" className="text-base">
              You need to be logged in to access your dashboard.
            </Typography>

            <Btn onClick={() => navigate("/login")}>
              Log in
            </Btn>
          </CardBody>
        </Card>
      </section>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    // tog bort p-8 nedan för att få bort sid scroll!
    <section className=" min-h-[82vh] w-full place-items-stretch">
      <div className="container mx-auto px-2 text-center">
        <DashboardHeader user={user} />
        <Stats subscriptions={subscriptions} />
        <SubscriptionList subscriptions={subscriptions} />
        <Linegraph subscriptions={subscriptions} />
      </div>

    <SubscriptionSave />

    </section>
  );
};