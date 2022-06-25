const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "10rem",
        "2xl": "10rem",
      },
    },
    // customForms: (theme) => ({
    //   default: {
    //     checkbox: {
    //       "&:focus": {
    //         borderColor: undefined,
    //       },
    //     },
    //   },
    // }),
    extend: {},
    container: {
      center: true,
      padding: {
        default: ".75rem",
        sm: "2rem",
        md: ".5rem",
        lg: ".75rem",
        xl: "1.25rem",
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      gray: colors.gray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      lightBlue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require("@tailwindcss/custom-forms")],
};
