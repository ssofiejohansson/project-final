import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Collapse, IconButton, Typography } from "@material-tailwind/react";
import Logo from "/subscribee-logo.webp";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Logout } from "../../comp/user/LogoutBtn";
import useUserStore from "../../stores/useUserStore";
import { Btn } from "./Btn";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const user = useUserStore((state) => state.user);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const closeMenu = () => setOpen(false);

  const NavItem = ({ to, label, onClick }) => (
    <Link to={to} onClick={onClick}>
      <Typography
        as="li"
        className="text-text p-1 font-medium hover:text-main transition-colors"
      >
        {label}
      </Typography>
    </Link>
  );

  const NavList = ({ onClick }) => (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8 font-textfont">
      {!isHome && <NavItem to="/" label="Home" onClick={onClick} />}
      <NavItem to="/about" label="About" onClick={onClick} />
      <li>
        <a
          href="mailto:"
          className="text-text p-1 hover:text-main transition-colors font-textfont"
        >
          Contact
        </a>
      </li>
    </ul>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 shadow-lg rounded-b-xl bg-white">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <Typography
            as={Link}
            to="/"
            className="cursor-pointer flex items-center gap-3"
          >
            <img src={Logo} alt="SubscriBee Logo" className="h-10 m-1" />
            <span className="text-xl font-extrabold font-heading bg-gradient-to-r from-main to-accent bg-clip-text text-transparent drop-shadow-sm">
              SubscriBee
            </span>
          </Typography>

          {/* Center */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavList />
          </div>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-4 font-textfont">
            {user ? (
              <>
                <span className="text-md">Hi {user.name}!</span>
                <Btn
                  onClick={() => navigate("/admin")}
                  size="sm"
                  variant="outlined"
                >
                  Dashboard
                </Btn>
                <Logout size="sm" variant="text" />
              </>
            ) : (
              <>
                <Btn
                  onClick={() => navigate("/login")}
                  size="sm"
                  variant="filled"
                >
                  Log in
                </Btn>
                <Btn
                  onClick={() => navigate("/signup")}
                  size="sm"
                  variant="outlined"
                >
                  Sign up
                </Btn>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <IconButton
            alt="Hamburger menu"
            aria-label="Hamburger menu"
            size="sm"
            variant="text"
            onClick={handleOpen}
            className="text-text ml-auto inline-block lg:hidden"
          >
            {open ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>

        {/* Mobile menu */}
        <Collapse open={open}>
          <div className="mt-2 rounded-xl bg-white pb-4 px-4 flex flex-col">
            {/* TOP section */}
            {user ? (
              <>
                <Typography className="text-lg py-1">
                  Hi {user.name}!
                </Typography>
                <div className="flex flex-col gap-2 py-2 text-main border-t border-gray-200">
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="hover:text-text font-medium"
                  >
                    Dashboard
                  </Link>
                </div>
                <div className="flex flex-col gap-2 border-gray-200">
                  <NavList onClick={closeMenu} />
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 ">
                <NavList onClick={closeMenu} />
              </div>
            )}

            {/* BOTTOM section */}
            <div className="mt-auto flex flex-col gap-2 pt-4 border-gray-200">
              {user ? (
                <div
                  onClick={() => {
                    closeMenu();
                  }}
                >
                  <Logout size="md" variant="text" />
                </div>
              ) : (
                <>
                  <Btn
                    onClick={() => {
                      navigate("/login");
                      closeMenu();
                    }}
                    size="md"
                    variant="filled"
                    className="mb-2 w-auto self-start"
                  >
                    Log in
                  </Btn>
                  <Btn
                    onClick={() => {
                      navigate("/signup");
                      closeMenu();
                    }}
                    size="md"
                    variant="outlined"
                    className=" w-auto self-start"
                  >
                    Sign up
                  </Btn>
                </>
              )}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};
