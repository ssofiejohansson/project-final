import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { IconButton, Typography } from "@material-tailwind/react";
import Logo from "/subscribee-logo-left.webp";
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
        <div className="relative bg-white shadow-lg rounded-2xl py-4 px-4 max-w-xs mb-3 border-l-4 border-accent">
          <IconButton
            variant="text"
            className="!absolute top-0 right-0 text-accent hover:text-main hover:bg-transparent active:bg-transparent transition"
            onClick={() => setCollapsed(true)}
          >
            <ChevronDownIcon className="h-6 w-6" />
          </IconButton>

          <Typography variant="medium" className="p-2 text-text leading-relaxed text-center">
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
          width={50}
          height={50}
          className="animate-buzzCircle transition-transform"
        />
      </div>

      {collapsed && (
        <IconButton
          variant="text"
          className="m-2 text-main hover:text-accent hover:bg-transparent transition"
          onClick={() => setCollapsed(false)}
        >
          <ChevronUpIcon className="h-6 w-6" />
        </IconButton>
      )}
    </div>
  );
};
