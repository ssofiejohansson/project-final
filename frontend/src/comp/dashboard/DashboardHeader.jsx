import { Typography } from "@material-tailwind/react";

export const DashboardHeader = ({ user }) => {
  return (
    <header className="text-center px-4 sm:px-0">
      <Typography
        variant="h1"
        color="blue-gray"
        className="mx-auto my-6 w-full max-w-full break-words overflow-hidden leading-snug !text-2xl sm:!text-3xl md:!text-4xl lg:max-w-3xl lg:!text-5xl"
      >
        Welcome {user.name}! Here are your{" "}
        <span className="text-green-500 leading-snug break-words">
          subscriptions
        </span>.
      </Typography>

      <Typography
        variant="lead"
        className="mx-auto w-full max-w-full !text-gray-500 text-base sm:text-base lg:text-lg mb-8 break-words"
      >
        View and manage your subscriptions easily.
      </Typography>
    </header>
  );
};
