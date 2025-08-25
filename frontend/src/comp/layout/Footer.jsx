import { Typography } from "@material-tailwind/react";
import Logo from "/subscribee-logo-right.png";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/useUserStore";
import { Logout } from "../user/LogoutBtn";
import { Btn } from "./Btn";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <footer className="pt-12 bg-gray-50 border-t border-gray-200">
      <div className="px-8 container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-6 pb-4">
          <ul>
            <li>
              <Typography
                as={Link}
                to="/about"
                color="blue-gray"
                className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
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
                color="blue-gray"
                className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
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
                color="blue-gray"
                className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
              >
                FAQ
              </Typography>
            </li>
          </ul>

          <ul>
            <li>
              <Typography
                as={Link}
                to="/about#contact"
                color="blue-gray"
                className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
              >
                Contact
              </Typography>
            </li>
          </ul>
        </div>

        <div className="flex gap-6 pb-6">
          {user ? (

            <Logout />

          ) : (
            <>
              <Btn onClick={() => navigate("/login")} size="sm" variant="filled">
                Log in
              </Btn>
              <Btn onClick={() => navigate("/signup")} size="sm" variant="filled">
                Sign Up
              </Btn>
            </>
          )}
        </div>


        <Typography
          color="blue-gray"
          className="mt-4 !text-sm !font-normal text-gray-500"
        >
          &copy; {currentYear} SubscriBee. All rights reserved.
        </Typography>

      </div>
      <img src={Logo} alt="SubscriBee Logo" className="h-40 w-40 object-contain " />
    </footer>
  );
};
