import { Typography } from "@material-tailwind/react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";

export const DashboardHeader = ({ user }) => {
  const subscriptions = useSubscriptionStore((s) => s.subscriptions);
  const hasSubs = subscriptions.length > 0;

  return (
    <header className="text-center px-4 sm:px-0">
      <Typography
        variant="h1"

        className="text-text mx-auto my-6 w-full max-w-full break-words overflow-hidden leading-snug !text-2xl sm:!text-3xl md:!text-4xl lg:max-w-3xl lg:!text-5xl"
      >
        {hasSubs ? (
          <>
            Welcome {user.name}! Here are your{" "}
            <span className="text-main leading-snug break-words">
              subscriptions
            </span>.
          </>
        ) : (
          <>Welcome {user.name}! You currently have no <span className="text-main leading-snug break-words">
            subscriptions
          </span>.</>
        )}
      </Typography>

      <Typography
        variant="lead"
        className="mx-auto w-full max-w-full text-light  sm: lg:text-lg mb-8 break-words"
      >
        {hasSubs
          ? "View and manage your subscriptions easily."
          : "Start by adding your first subscription below."}
      </Typography>
    </header>
  );
};
