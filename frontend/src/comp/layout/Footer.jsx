import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Btn } from "../Btn";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="px-8 py-12 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto flex flex-col items-center">

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
                to="/about"
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
                to="/about"
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

        </div>


        <div className="flex gap-6 pb-6">
          <Btn
            onClick={() => navigate("/login")}
            size="md"
            variant="filled"
          >
            Log in
          </Btn>
          <Btn
            onClick={() => navigate("/signup")}
            size="md"
            variant="filled"
          >
            Sign Up
          </Btn>

        </div>

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
