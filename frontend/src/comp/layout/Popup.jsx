import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography } from "@material-tailwind/react";
import Logo from "/subscribee-logo-left.png";
import { useEffect, useState } from "react";
export const Popup = ({ children, delay }) => {
  const [visible, setVisible] = useState(!delay);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:flex flex-col items-center animate-slideUpFade">
      {!collapsed && (
        <div className="relative bg-white shadow-lg rounded-2xl py-8 px-6 max-w-xs mb-3 border-l-4 border-t-4 border-main">
          <IconButton
            variant="text"
            className="!absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition"
            onClick={() => setCollapsed(true)}
          >
            <ChevronDownIcon className="h-5 w-5" />
          </IconButton>

          <Typography variant="medium" className="text-text leading-relaxed">
            {children}
          </Typography>
        </div>
      )}

      {/* Logo toggle */}
      <div
        onClick={() => setCollapsed(false)}
        className="cursor-pointer transition-transform mt-1"
      >
        <img
          src={Logo}
          alt="SubscriBee Logo"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>

      {collapsed && (
        <IconButton
          variant="text"
          className="m-2 text-gray-400 hover:text-gray-600 transition"
          onClick={() => setCollapsed(false)}
        >
          <ChevronUpIcon className="h-5 w-5" />
        </IconButton>
      )}
    </div>
  );
};
