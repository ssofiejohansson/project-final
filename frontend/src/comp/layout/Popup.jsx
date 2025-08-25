import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";
import Logo from "/subscribee-logo.png";
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
      {/* Content in bubble */}
      {!collapsed && (
        <div className="relative text-blue-900 px-4 py-3 rounded-2xl shadow-lg mb-3 max-w-xs bg-white">
          {/* Collapse button */}
          <IconButton
            variant="text"
            className="!absolute top-1 right-1 text-gray-500"
            onClick={() => setCollapsed(true)}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </IconButton>

          {/* Different messages depending on content */}
          {children}

        </div>
      )}

      {/* Logo (click to toggle back open) */}
      <div
        onClick={() => setCollapsed(false)}
        className="cursor-pointer"
      >
        <img
          src={Logo}
          alt="Subscribee Logo"
          width={60}
          height={60}
          className=""
        />
      </div>

      {/* Show expand arrow if collapsed */}
      {collapsed && (
        <IconButton
          variant="text"
          className="mt-2 text-gray-500"
          onClick={() => setCollapsed(false)}
        >
          <ChevronUpIcon className="h-4 w-4" />
        </IconButton>
      )}
    </div>
  );
};
