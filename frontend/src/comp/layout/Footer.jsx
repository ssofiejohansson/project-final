import { Typography } from "@material-tailwind/react";
import Logo from "/subscribee-logo-right.png";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import { Logout } from "../user/LogoutBtn";
import { Btn } from "./Btn";
import { EnvelopeIcon } from "@heroicons/react/24/solid";


export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <footer className="pt-12 bg-gray-50 border-t border-gray-200">
      <div className="px-8 container mx-auto flex flex-col items-center">
        <div className="text-text flex flex-wrap items-center justify-center gap-6 pb-4 ">
          <ul>
            <li>
              <Typography
                as={Link}
                to="/about"
                className="font-medium transition-colors  hover:text-main "
              >
                About SubscriBee
              </Typography>
            </li>
          </ul>
          <ul>
            <li>
              <Typography
                as={Link}
                to="/about#project"

                className="font-medium transition-colors  hover:text-main"
              >
                About this project
              </Typography>
            </li>
          </ul>
          <ul>
            <li>
              <Typography
                as={Link}
                to="/about#faq"

                className="font-medium transition-colors  hover:text-main"
              >
                FAQ
              </Typography>
            </li>
          </ul>

          <ul>
            <li>
              <a
                href="mailto:subscribee.reminder@gmail.com"
                className="flex items-center gap-2 font-medium transition-colors hover:text-main"
              >
                <EnvelopeIcon className="text-main h-5 w-5" />
                Contact us
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-6 pb-6 items-center">
          {user ? (
            <>
              <Btn onClick={() => navigate("/admin")} size="sm" variant="filled">
                Dashboard
              </Btn>
              <Logout size="sm" />
            </>
          ) : (
            <>
              <Btn onClick={() => navigate("/login")} size="sm" variant="filled">
                Log in
              </Btn>
              <Btn onClick={() => navigate("/signup")} size="sm" variant="text">
                Sign Up
              </Btn>
            </>
          )}
        </div>


        <Typography

          className="mt-4 !text-sm !font-normal text-light"
        >
          &copy; {currentYear} SubscriBee. All rights reserved.
        </Typography>

      </div>
      <img src={Logo} alt="SubscriBee Logo" className="h-40 w-40 object-contain " />
    </footer>
  );
};
