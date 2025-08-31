import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

export const AboutSub = () => {
  return (
    <header className="bg-white py-4 lg:py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <Typography
          variant="h1"
          className="text-text pb-6 mx-auto w-full leading-snug text-3xl lg:max-w-3xl lg:text-5xl font-heading text-center"
        >
          About <span className="text-main leading-snug">SubscriBee</span>
        </Typography>

        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 text-left text-text">
          <Typography variant="paragraph" className="lg:text-lg">
            Subscriptions are part of everyday life, but they’re easy to lose
            track of. According to research, many people end up spending a lot
            more money than they realize. It’s easy to sign up for free trials
            and then forget about them. Subscriptions keep running and charges
            continue even when they’re not being used. Those small monthly costs
            add up quickly, and before you know it, they’re taking a real bite
            out of your budget.
          </Typography>
          <Typography variant="paragraph" className="lg:text-lg">
            SubscriBee was created to help you see the full picture. With all
            your subscriptions in one place, you’ll stay organized, avoid
            surprises and feel more confident about your money. Add your
            subscriptions easily and get friendly email reminders from Beeatrice
            when a free trial is ending or a new payment is coming up. She’ll
            also suggest smarter ways to use your money instead of wasting it on
            unused subscriptions. Start saving your honey today — sign up now!
          </Typography>
        </div>

        {/* Scroll Down Button */}
        <div className="mt-10 flex justify-center">
          <a href="#project" className="group animate-bounce" aria-label="Scroll down to next section">
            <ArrowDownCircleIcon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </header>
  );
};
