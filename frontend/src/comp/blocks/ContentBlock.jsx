import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

import { Btn } from "../layout/Btn";

export const ContentBlock = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white p-8">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <Typography
          variant="h1"

          className="text-text mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
        >
          So why{" "}
          <span className="text-main leading-snug">SubscriBee</span>?
        </Typography>

        {/* Feature List */}
        <ul className="mx-auto mt-6 max-w-lg space-y-4 text-left">
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="h-6 w-6 text-accent flex-shrink-0" />
            <Typography
              variant="lead"
              className="!text-light lg:text-lg text-base"
            >
              Easy to use and easy to trust
            </Typography>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="h-6 w-6 text-accent  flex-shrink-0" />
            <Typography
              variant="lead"
              className="!text-light lg:text-lg text-base"
            >
              Prevents surprise charges and forgotten trials
            </Typography>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircleIcon className="h-6 w-6 text-accent flex-shrink-0" />
            <Typography
              variant="lead"
              className="!text-light lg:text-lg text-base"
            >
              Gives you insights to save more each month
            </Typography>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="mt-10 flex justify-center">
          <Btn
            onClick={() => navigate("/signup")}
            size="md"
            variant="outlined"
          >
            Join the hive
          </Btn>
        </div>
      </div>
    </section>
  );
};
