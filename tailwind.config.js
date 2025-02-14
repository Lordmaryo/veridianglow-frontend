/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#F872C4",
        // secondary: "#FACC15",
        accent: "#F872C4",
        background: "#FFF",
        textOnAccent: "#FFF",
      },
    },
  },
  plugins: [],
};
