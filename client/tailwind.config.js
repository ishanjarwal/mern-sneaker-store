/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "text": "var(--text)",
        "muted-text": "var(--muted-text)",
        "muted-bg": "var(--muted-bg)",
      }
    },
  },
  plugins: [],
}