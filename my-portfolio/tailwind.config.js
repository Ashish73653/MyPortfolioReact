module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2563eb", // blue-600
        accent: "#22d3ee", // cyan-400
        dark: "#111827", // gray-900
        light: "#f1f5f9", // gray-100
      },
    },
  },
  plugins: [],
};
