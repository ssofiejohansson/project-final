import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export const TopArrow = () => {
  const [visible, setVisible] = useState(false);

  // Show button when scrolling down on the page
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <IconButton
          size="lg"
          color="blue"
          onClick={scrollToTop}
          className="shadow-lg rounded-full"
        >
          <ArrowUpCircleIcon className="h-6 w-6" />
        </IconButton>
      </div>
    )
  );
};
