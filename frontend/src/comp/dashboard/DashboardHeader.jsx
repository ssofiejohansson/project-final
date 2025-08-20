import { Typography } from "@material-tailwind/react";

export const DashboardHeader = ({ user }) => {
  return (
    <div className="text-center">
      <Typography
        variant="h1"
        color="blue-gray"
        className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
      >
        Welcome {user.name}! Here are your{" "}
        <span className="text-green-500 leading-snug">subscriptions</span>.
      </Typography>

      <Typography
        variant="lead"
        className="mx-auto w-full !text-gray-500 lg:text-lg text-base mb-8"
      >
        View and manage your subscriptions easily.
      </Typography>
    </div>
  );
};
