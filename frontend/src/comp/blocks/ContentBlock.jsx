import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

import { Btn } from "../layout/Btn";

export const ContentBlock = () => {
  return (
    <section className="bg-white p-8">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <Typography
          variant="h1"
          color="blue-gray"
          className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
        >
          So why{" "}
          <span className="text-green-500 leading-snug">SubscriBee</span>?
        </Typography>

        {/* Feature List */}
        <ul className="mx-auto mt-6 max-w-lg space-y-4 text-left">
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
            <Typography
              variant="lead"
              className="!text-gray-600 lg:text-lg text-base"
            >
              Easy to use and easy to trust
            </Typography>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
            <Typography
              variant="lead"
              className="!text-gray-600 lg:text-lg text-base"
            >
              Prevents surprise charges and forgotten trials
            </Typography>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
            <Typography
              variant="lead"
              className="!text-gray-600 lg:text-lg text-base"
            >
              Gives you insights to save more each month
            </Typography>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Btn variant="outlined" size="lg">
            Join the hive
          </Btn>
        </div>
      </div>
    </section>
  );
};
