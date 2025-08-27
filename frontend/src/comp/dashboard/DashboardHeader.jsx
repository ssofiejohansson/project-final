import { Typography } from "@material-tailwind/react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import useSubscriptionStore from "../../stores/useSubscriptionStore";

export const DashboardHeader = ({ user }) => {
  const subscriptions = useSubscriptionStore((s) => s.subscriptions);
  const hasSubs = subscriptions.length > 0;

  return (
    <header className="text-center px-6 pt-4 lg:pt-10">
      <Typography
        variant="h1"
        className="text-text mx-auto my-4 w-full max-w-full break-words overflow-hidden leading-snug !text-2xl sm:!text-3xl md:!text-4xl lg:max-w-3xl lg:!text-5xl"
      >
        {hasSubs ? (
          <>
            Welcome {user.name}! Here are your{" "}
            <span className="text-main leading-snug break-words">
              subscriptions
            </span>
            .
          </>
        ) : (
          <>
            Welcome {user.name}! You currently have no{" "}
            <span className="text-main leading-snug break-words">
              subscriptions
            </span>
            .
          </>
        )}
      </Typography>

      <Typography
        variant="lead"
        className="mx-auto w-full max-w-full text-light lg:text-lg mb-8 break-words"
      >
        {hasSubs
          ? "View and manage your subscriptions easily."
          : "Let's start by adding your first subscription in the dashboard below."}
      </Typography>
      <div className="mt-10 flex justify-center">
        <a href="#dashboard" className="group animate-bounce">
          <ArrowDownCircleIcon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
        </a>
      </div>
    </header>
  );
};
