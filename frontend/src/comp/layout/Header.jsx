import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import HeroImage from "../../assets/images/hero-img.webp";
import { useUserStore } from "../../stores/useUserStore";
import { Btn } from "./Btn";

export const Header = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <header className="bg-white pt-4 lg:pt-10 ">
      <div className="grid w-full px-4 place-items-stretch">
        <div className="container mx-auto px-4 text-center">
          <Typography
            variant="h1"
            className="text-text pb-6 mx-auto w-full leading-snug !text-4xl lg:max-w-3xl lg:!text-5xl font-heading"
          >
            Bee in control of your subscriptions with{" "}
            <span className="!text-5xl lg:!text-6xl bg-gradient-to-r from-main to-accent bg-clip-text text-transparent drop-shadow-sm leading-snug">
              SubscriBee
            </span>
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full text-light lg:text-lg text-base"
          >
            We make it simple to track monthly and yearly costs, so you always
            know where your money’s going.
          </Typography>
          <div className="mt-8 grid w-full place-items-start md:justify-center">
            <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
              {user ? (
                <Btn
                  onClick={() => navigate("/admin")}
                  size="md"
                  variant="filled"
                >
                  Dashboard
                </Btn>
              ) : (
                <Btn
                  onClick={() => navigate("/signup")}
                  size="md"
                  variant="filled"
                >
                  Join the hive
                </Btn>
              )}
            </div>
          </div>
        </div>

        <div
          className="mt-6 w-auto h-[300px] lg:h-[400px] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${HeroImage})` }}
        ></div>
      </div>
    </header>
  );
};
