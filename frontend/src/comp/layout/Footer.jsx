import { CodeBracketIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import Logo from "/subscribee-logo-right.webp";
import { Link, useNavigate } from "react-router-dom";

import useUserStore from "../../stores/useUserStore";
import { Logout } from "../user/LogoutBtn";
import { Btn } from "./Btn";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  return (
    <footer className="pt-12 bg-gray-50 border-t border-gray-200 font-textfont">
      <div className="px-8 container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-6 pb-4 ">
          <ul>
            <li>
              <Link to="/about" className="transition-colors hover:text-accent">
                About Subscribee
              </Link>
            </li>
          </ul>

          <ul>
            <li>
              <a
                href="mailto:"
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <EnvelopeIcon className="text-accent h-5 w-5" />
                Contact us
              </a>
            </li>
          </ul>

          <ul>
            <li>
              <a
                href="https://github.com/ssofiejohansson/project-final"
                target="_blank"
                className="flex items-center gap-2 transition-colors hover:text-accent"
              >
                <CodeBracketIcon className="text-accent h-5 w-5" />
                GitHub
              </a>
            </li>
          </ul>
        </div>

        <div className="flex gap-6 pb-6 items-center">
          {user ? (
            <>
              <Btn
                onClick={() => navigate("/admin")}
                size="md"
                variant="outlined"
              >
                Dashboard
              </Btn>
              <Logout size="md" variant="text" />
            </>
          ) : (
            <Btn
              onClick={() => navigate("/login")}
              size="md"
              variant="outlined"
            >
              Log in
            </Btn>
          )}
        </div>

        <Typography className="mt-4">
          &copy; {currentYear} SubscriBee. All rights reserved.
        </Typography>
      </div>
      <img
        src={Logo}
        alt="SubscriBee Logo"
        className="h-40 w-40 object-contain "
      />
    </footer>
  );
};
