import Logo from "/subscribee-logo-buzzing.webp";
import { motion } from "framer-motion";

export const Loader = () => {
  const trailCount = 5;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50 overflow-hidden">
      {/* Trail */}
      {[...Array(trailCount)].map((_, i) => (
        <motion.img
          key={i}
          src={Logo}
          alt="Bee Trail"
          className="w-10 h-10 absolute"
          style={{ opacity: 0.15 + (0.2 * (i / trailCount)) }}
          animate={{
            x: [600, -600], // move right → left
            y: [0, -50, 0, 50, 0], // subtle vertical bobbing
          }}
          transition={{
            repeat: Infinity,
            duration: 4, // speed of trail
            ease: "easeInOut",
            delay: i * 0.2, // stagger trail
          }}
        />
      ))}

      {/* Main Bee */}
      <motion.img
        src={Logo}
        alt="Bee Loader"
        className="w-10 h-10 absolute"
        animate={{
          x: [600, -600], // bee going right → left
          y: [0, -30, 0, 30, 0], // bee going up and down
        }}
        transition={{
          repeat: Infinity,
          duration: 3, // slightly faster main bee
          ease: "easeInOut",
        }}
      />
      <p className="p-4 mt-40 text-center text-text font-bold text-md">
        Hold on! Beeatrice is buzzing as fast as she can...
      </p>
    </div>
  );
};


