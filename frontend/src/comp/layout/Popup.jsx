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
    <div
      className="
        fixed bottom-6 right-6 z-50
        hidden md:flex flex-col items-center
        animate-[slideUpFade_0.6s_ease-out]
      "
    >
      {/* Bubble content */}
      {!collapsed && (
        <div className="relative bg-white shadow-lg rounded-2xl p-8 max-w-xs mb-3 border-l-4 border-green-500">
          {/* Collapse button as down arrow */}
          <IconButton
            variant="text"
            className="!absolute top-1 right-1 text-gray-400 hover:text-gray-600 transition"
            onClick={() => setCollapsed(true)}
          >
            <ChevronDownIcon className="h-6 w-6" />
          </IconButton>

          {/* Content */}
          <Typography variant="small" className="text-gray-700 leading-relaxed">
            {children}
          </Typography>
        </div>
      )}

      {/* Logo toggle */}
      <div
        onClick={() => setCollapsed(false)}
        className="transition-transform mt-1"
      >
        <img
          src={Logo}
          alt="SubscriBee Logo"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>

      {/* Expand arrow if collapsed */}
      {collapsed && (
        <IconButton
          variant="text"
          className="mt-2 text-gray-400 hover:text-gray-600 transition"
          onClick={() => setCollapsed(false)}
        >
          <ChevronUpIcon className="h-6 w-6" />
        </IconButton>
      )}
    </div>
  );
};
