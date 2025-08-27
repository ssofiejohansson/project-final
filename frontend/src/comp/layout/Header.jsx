import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import HeroImage from "../../assets/home-img/hero-img.png"
import { Btn } from "./Btn";

export const Header = () => {
  const navigate = useNavigate();

  return (

    <header className="bg-white px-8">
      <div className="grid pt-8 w-full place-items-stretch">
        <div className="container mx-auto px-4 text-center">
          <Typography
            variant="h1"
            className="text-text mx-auto py-2 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
          >
            Track your subscriptions with{" "}
            <span className="text-main leading-snug">SubscriBee</span>.
          </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full text-light lg:text-lg text-base"
          >
            We makes it simple to track monthly and yearly costs, so you always
            know where your money’s going.
          </Typography>
          <div className="mt-8 grid w-full place-items-start md:justify-center">
            <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">
              <Btn
                onClick={() => navigate("/signup")}
                className="text-base lg:text-lg px-4 lg:px-6 py-2 lg:py-3"
                variant="filled"
              >
                Join the hive
              </Btn>
            </div>
          </div>
        </div>

        <div
          className="mt-4 w-full h-[300px] lg:h-[400px] bg-center bg-contain bg-no-repeat"
          style={{ backgroundImage: `url(${HeroImage})` }}
        ></div>
      </div>
    </header>
  );
};

