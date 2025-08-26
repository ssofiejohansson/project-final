import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export const AboutSub = () => {
  return (
    <header className="bg-white p-8">
      <div className="container mx-auto px-4 text-center">
        {/* Title */}
        <Typography
          variant="h1"

          className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
        >
          About{" "}
          <span className="text-main leading-snug">SubscriBee</span>
        </Typography>

        {/* Intro Text */}
        <div className="mx-auto max-w-2xl space-y-4">
          <Typography
            variant="lead"
            className="!text-gray-600 lg:text-lg text-base"
          >
            Subscriptions are part of everyday life, but they’re easy to lose
            track of. Small monthly charges add up quickly, and before you know
            it, they’re taking a real bite out of your budget.
          </Typography>
          <Typography
            variant="lead"
            className="!text-gray-600 lg:text-lg text-base"
          >
            SubscriBee was created to help you see the full picture. With one
            place to track all your subscriptions, you’ll stay organized, avoid
            surprises, and feel more confident about your money.
          </Typography>
          <Typography
            variant="lead"
            className="!text-gray-600 lg:text-lg text-base"
          >
            Beeatrice, our helpful mascot, pops in along the way to celebrate
            your wins and keep things light—because managing money should feel
            empowering, not stressful.
          </Typography>
        </div>

        {/* Scroll Down Button */}
        <div className="mt-10 flex justify-center">
          <a href="#project" className="group animate-bounce">
            <ArrowDownCircleIcon className="h-12 w-12 text-accent group-hover:text-main transition-transform duration-300" />
          </a>
        </div>
      </div>
    </header>
  );
};
