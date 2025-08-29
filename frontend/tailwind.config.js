const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#047857", // teal greeen 
        accent: "#065F46", //Amerald
        
        // main: "#000000",   // black
        // accent: "#444444", // dark grey
        text: "#333333", // charcoal
        light: "#555555", // light-grey
      },
      keyframes: {
        slideUpFade: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        buzzCircle: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(2px, -2px) rotate(5deg)" },
          "50%": { transform: "translate(0, -4px) rotate(0deg)" },
          "75%": { transform: "translate(-2px, -2px) rotate(-5deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
      },
      animation: {
        slideUpFade: "slideUpFade 0.6s ease-out",
        buzzCircle: "buzzCircle 0.4s linear infinite",
      },
      fontFamily: {
        heading: ["Didact Gothic", "sans-serif"],
        textfont: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        light: 100,
        normal: 400,
        medium: 500,
        bold: 700,
      },
    },
  },
  plugins: [],
});
