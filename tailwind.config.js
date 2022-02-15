module.exports = {
  content: ["./(app|slices)/**/*.{ts,tsx,jsx,js}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        // https://coolors.co/191d32-282f44-453a49-6d3b47-ba2c73
        primary: { 500: "#BA2C73", 600: "#ac286a" },
      },
    },
  },
  variants: {},
  plugins: [],
};
