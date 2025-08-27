const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#f57508",   // orange
        accent: "#ffd166", // yellow
        text: "#333333",   // charcoal
        light: "#555555", // light-grey
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