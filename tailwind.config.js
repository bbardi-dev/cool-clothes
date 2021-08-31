module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        hand: [
          "Satisfy",
          "ui-serif",
          " Georgia",
          "Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        body: [
          "Lato",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      transitionTimingFunction: {
        woo: "cubic-bezier(0.25, 0.45, 0.45, 0.95)",
      },
      margin: ["first, last"],
      minWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      maxWidth: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      height: {
        0: "0",
        120: "30rem",
        144: "36rem",
        192: "48rem",
      },
      screens: {
        xs: "300px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
