import { motion } from "framer-motion";
import Logo from "../../assets/subscribee-logo.png";

export const Loader = () => {
  const trailCount = 3; // how many faded bees follow the main bee

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
            x: [400, -400], // left ↔ right
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5, // faster flight
            ease: "easeInOut",
            delay: i * 0.1, // stagger trail
          }}
        />
      ))}

      {/* Main Bee */}
      <motion.img
        src={Logo}
        alt="Bee Loader"
        className="w-10 h-10 absolute"
        animate={{
          x: [400, -400], // main flight
        }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5, // faster flight
          ease: "easeInOut",
        }}
      />
    </div>
  );
};


// <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
//   <Spinner className="h-16 w-16" />
// </div>
