import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export const AboutSub = () => {
  return (
    <header className="bg-white p-8">
      <div className="container mx-auto px-4 text-center">
        <Typography
          variant="h1"
          className="text-text mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
        >
          About <span className="text-main leading-snug">SubscriBee</span>
        </Typography>

        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 md:text-left">
          <Typography
            variant="paragraph"
            className="text-light lg:text-lg"
          >
            Subscriptions are part of everyday life, but they’re easy to lose
            track of. Accordning to facts people tend to spend a hole lot of 
            money thay did not know about. It´s easy to sign up for free trials 
            and forget about them. Subscriptions keep running and withdraws 
            continue even when they are not in use anymore. Small monthly 
            charges add up quickly and before you know it, they’re taking a 
            real bite out of your budget. 
          </Typography>
          <Typography
            variant="paragraph"
            className="text-light lg:text-lg"
          >
            SubscriBee was created to help you see the full picture. With one
            place to track all your subscriptions, you’ll stay organized, avoid
            surprises and feel more confident about your money. Add all your 
            subscriptions in one place and get email notifications from Beeatrice 
            when a free trial is ending or a new payment period is coming up. 
            She will also suggest ways you can spend your money more wisely 
            instead of paying for unused subscriptions. Start saving some honey 
            today and sign up!
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
