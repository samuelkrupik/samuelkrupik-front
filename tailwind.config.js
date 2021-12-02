module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#FCBF00",
        secondary: "#FAA621",
        tertiary: "#357FC2",
        mid: "#6C748E",
        dark: "#242d49",
      },
      boxShadow: {
        "secondary-xl": "0 10px 25px -5px rgba(248, 151, 53, 0.63)",
        "secondary-2xl": "0 10px 25px rgba(248, 151, 53, 0.8)",
        "tertiary-xl": "0 10px 25px -5px rgba(40,128,174,0.22)",
        "tertiary-2xl": "0 10px 25px rgba(40,128,174,0.22)",
      },
    },
    fontFamily: {
      sans: ['"Open Sans"', "Helvetica", "Arial", "sans-serif"],
      heading: ["Calibri", "Helvetica", "Arial", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
