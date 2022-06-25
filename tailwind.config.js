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
    customForms: (theme) => ({
      default: {
        checkbox: {
          "&:focus": {
            borderColor: undefined,
          },
        },
      },
    }),
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
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
