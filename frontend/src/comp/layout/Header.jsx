import { Button, Input, Typography } from "@material-tailwind/react";

import { Btn } from "./Btn";

export const Header = () => {
  return (
    // Option Hero 1
    <>
      <header className="bg-white p-8">
        <div className="grid mt-16 min-h-[82vh] w-full lg:h-[54rem] md:h-[34rem] place-items-stretch bg-[url('/image/bg-hero-17.svg')] bg-center bg-contain bg-no-repeat">
          <div className="container mx-auto px-4 text-center">

            <Typography
              variant="h1"
              color="blue-gray"
              className="mx-auto my-6 w-full leading-snug !text-2xl lg:max-w-3xl lg:!text-5xl"
            >
              Welcome to {" "}
              <span className="text-green-500 leading-snug ">SubscriBee</span>.

            </Typography>
            <Typography
              variant="lead"
              className="mx-auto w-full !text-gray-500 lg:text-lg text-base"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, nam. At, quas ex!
            </Typography>
            <div className="mt-8 grid w-full place-items-start md:justify-center">
              <div className="mb-2 flex w-full flex-col gap-4 md:flex-row">

                <Btn>
                  Log in
                </Btn>
                <button className="px-6 py-3 border border-gray-800 rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

