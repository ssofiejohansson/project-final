import { Bars3Icon, ChevronDownIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Collapse, IconButton, Menu, MenuHandler, MenuItem, MenuList, Navbar as MTNavbar, Typography } from "@material-tailwind/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Logout } from "../../comp/user/LogoutBtn";
import useUserStore from "../../stores/useUserStore";

export const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const user = useUserStore((state) => state.user);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavItem = ({ to, label }) => (
    <Link to={to}>
      <Typography
        as="li"
        color="blue-gray"
        className="p-1 font-medium hover:text-blue-600 transition-colors"
      >
        {label}
      </Typography>
    </Link>
  );

  const NavList = () => (
    <ul className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      {!isHome && <NavItem to="/" label="Home" />}
      <NavItem to="/about" label="About" />
      <NavItem to="#" label="Contact" />
    </ul>
  );

  return (
    <MTNavbar color="transparent" fullWidth>
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        {/* Left */}
        <Typography
          as={Link}
          to="/"
          color="blue-gray"
          className="mr-4 cursor-pointer text-lg font-bold"
        >
          SubscriBee
        </Typography>

        {/* Center */}
        <div className="hidden lg:flex flex-1 justify-center">
          <NavList />
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center gap-6">
          {user ? (
            <>
              <span className="text-sm font-medium">Hi {user.name}!</span>
              <Menu placement="bottom-end">
                <MenuHandler>
                  <button className="flex items-center gap-1 cursor-pointer">
                    <UserCircleIcon className="h-8 w-8 text-blue-gray-700" />
                    <ChevronDownIcon className="h-4 w-4 text-blue-gray-600" />
                  </button>
                </MenuHandler>
                <MenuList>
                  <MenuItem>
                    <Link to="/admin">Dashboard</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/subscriptions/add">Add subscription</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/help">Help</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <Logout />
            </>
          ) : (
            <div className="flex items-center gap-4">
              <NavItem to="/login" label="Login" />
              <NavItem to="/signup" label="Sign Up" />
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <IconButton
          size="sm"
          variant="text"
          color="blue-gray"
          onClick={handleOpen}
          className="ml-auto inline-block text-blue-gray-900 lg:hidden"
        >
          {open ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>

      {/* Mobile Menu */}
      <Collapse open={open}>
        <div className="mt-2 rounded-xl bg-white py-2 px-4 text-blue-gray-900">
          <NavList />
          {user ? (
            <div className="mt-4 flex flex-col gap-2">
              <Typography className="text-sm">Hi {user.name}!</Typography>
              <Link to="/admin">Dashboard</Link>
              <Link to="/subscriptions/add">Add subscription</Link>
              <Link to="/help">Help</Link>
              <Logout />
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </div>
      </Collapse>
    </MTNavbar>
  );
};
