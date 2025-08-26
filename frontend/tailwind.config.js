const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#FF5C8D',    // pink
        accent: '#FFD166',    // yellow
        text: '#333333',    // charcoal
      },
    },
  },
  plugins: [],
});