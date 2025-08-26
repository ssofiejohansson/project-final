import { FlagIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Btn } from "../comp/layout/Btn";

export const Error = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/"); // navigate to /home route
  };


  return (
    <div className="smx-auto grid place-items-center text-center px-8">

      <FlagIcon className="w-20 h-20 mx-auto" />
      <Typography
        variant="h1"

        className="text-text mt-10 !text-3xl !leading-snug md:!text-4xl"
      >
        Error 404 <br /> It looks like something went wrong.
      </Typography>
      <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
        Go back to home, and try again.
      </Typography>
      <Btn
        onClick={handleClick} variant="filled"
      >
        Back to home

      </Btn>
    </div >
  );
}