import { IconButton } from "@material-tailwind/react";
import Logo from "/subscribee-logo.png";
import { useEffect, useState } from "react";

export const Popup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // show after 1s delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null; // don't render until it's time

  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        hidden md:flex flex-col items-center
        animate-[slideUpFade_0.6s_ease-out]
      "
    >
      {/* Speech bubble above logo */}
      <div className="relative bg-blue-100 text-blue-900 px-4 py-3 rounded-2xl shadow-lg mb-3 max-w-xs">
        {/* Close button */}
        <IconButton
          variant="text"
          className="!absolute top-1 right-1 text-gray-500"
          onClick={() => setVisible(false)}
        >
          <i className="fas fa-close text-sm"></i>
        </IconButton>

        <p className="font-semibold">Welcome to our website!</p>
        <p className="text-gray-600 text-sm mt-1">
          Don&apos;t miss out on the latest deals and promotions.
        </p>

        {/* Bubble tail (pointing down to logo) */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 
                        border-l-8 border-l-transparent 
                        border-r-8 border-r-transparent 
                        border-t-10 border-t-blue-100"></div>
      </div>

      {/* Logo below */}
      <img
        src={Logo}
        alt="Subscribee Logo"
        width={60}
        height={60}
        className="rounded-full shadow-lg"
      />
    </div>
  );
};