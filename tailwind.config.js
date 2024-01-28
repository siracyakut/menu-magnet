/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff4544",
        stableLight: "#f1f2f5",
      },
      backgroundColor: {
        primary: "#ff4544",
        secondary: "#1b1b1b",
        stableLight: "#f1f2f5",
      },
      borderColor: {
        primary: "#ff4544",
        secondary: "#1b1b1b",
      },
      boxShadow: {
        primaryShadow: "0 4px 4px rgba(0, 0, 0, .25)",
      },
    },
  },
  plugins: [],
};
