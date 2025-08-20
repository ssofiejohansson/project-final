import { Typography } from "@material-tailwind/react";

import { Btn } from "../comp/layout/Btn";
import { Header } from "../comp/layout/Header";

export const Home = () => {
  return (
    <>
      <Header />
      {/* How it works guide */}
      {/* Read about us text */}

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[82vh]">

        {/* LEFT TEXT SECTION */}
        <div className="flex flex-col items-start justify-center text-left">
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-6 w-full leading-snug !text-3xl lg:max-w-xl lg:!text-5xl"
          >
            This is <span className="text-green-500">how it works</span>.
          </Typography>

          <Typography
            variant="lead"
            className="mb-8 w-full !text-gray-500 lg:text-lg text-base"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum perferendis tempore animi commodi accusamus fuga temporibus quas vel eaque, facere dicta, numquam laboriosam! Libero recusandae modi, ipsam eius at incidunt?
          </Typography>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Btn>Sign up</Btn>
            <button className="px-6 py-3 border border-gray-800 rounded-lg text-gray-900 font-medium hover:bg-gray-100 transition">
              FAQ
            </button>
          </div>
        </div>

        {/* RIGHT SINGLE IMAGE */}
        <div className="flex justify-center">
          <img
            src="/image/hero-image.jpg"
            alt="Hero"
            className="rounded-xl object-cover w-full max-w-md lg:max-w-full"
          />
        </div>
      </div>
    </>
  );
}