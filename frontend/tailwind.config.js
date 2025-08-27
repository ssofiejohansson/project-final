const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        //Sofies förslag
        // main: "#FF5C8D",   // pink
        // accent: "#FFD166", // yellow
        // text: "#333333",   // charcoal
        // light: "#757575", // light-grey

        //Sofias förslag
        main: "#D72660",      // Darker pink for white text support
        accent: "#FFD166",    // Yellow (fine as is)
        text: "#333333",      // Charcoal
        light: "#555555",     // Adjusted grey for contrast
      },
      keyframes: {
        slideUpFade: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        slideUpFade: "slideUpFade 0.6s ease-out",
      },
    },
  },
  plugins: [],
});