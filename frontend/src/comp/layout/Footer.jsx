import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-8 py-12 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto flex flex-col items-center">
        {/* Main Links */}
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
                to="/faq"
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
                to="/contact"
                color="blue-gray"
                className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
              >
                Contact
              </Typography>
            </li>
          </ul>
          <ul>
            <li>
              <Typography
                as={Link}
                to="/about-project"
                color="blue-gray"
                className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
              >
                About this project
              </Typography>
            </li>
          </ul>
        </div>

        {/* new row - will add buttons for this) */}
        <div className="flex gap-6 pb-6">
          <Typography
            as={Link}
            to="/signup"
            color="blue-gray"
            className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
          >
            Sign Up
          </Typography>
          <Typography
            as={Link}
            to="/login"
            color="blue-gray"
            className="font-medium !text-gray-600 transition-colors hover:!text-blue-600"
          >
            Login
          </Typography>
        </div>

        {/* Copyright */}
        <Typography
          color="blue-gray"
          className="mt-4 !text-sm !font-normal text-gray-500"
        >
          &copy; {currentYear} Subscribee. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};
