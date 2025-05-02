/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-color": "#191b24",
        "text-base": "#aaa",
        "primary-color": "#ffd875",
        "primary-color-hover": "#ffde8a",
        "primary-button-text": "#191b24",
        "primary-text": "#ffd875",
        "top-bg-default": "#202331",
        "border-color": "#ffffff10",
        "white-color": "#fff",
        "bg-color-2": "#282b3a",
        "bg-color-3": "#2f3346",
        "bg-color-4": "#3e435c",
        "bg-color-5": "#535d8e",
        "footer-bg": "#0f111a",
        "shadow-large": " 0 0 20px 20px rgba(0,0,0,.1)",
        "h-shadow": "0 2px 3px rgba(0,0,0,.4)",
        "category-name": "#fff",
        "bs-border-color": "rgba(0,0,0,.3)",
        "Toastify__progress-bar-error": "#f85f5f",
        "toastify-icon-color-error": "#f85f5f",

        "alert-color": "#58151c",
        "alert-bg": "#f8d7da",
        "alert-border-color": "#f1aeb5",
        "alert-link-color": "#58151c",
      },
      padding: {
        "padding-base": "30px",
      },
      fontFamily: {
        "body-font": "Inter, serif",
      },
      transition: {
        icon: "all .3s ease",
        default: "all .3s ease",
        fade: "all .15s ease",
      },
      screens: {
        "max-xxl": { max: "1900px" },
        "max-xl": { max: "1279px" },
        "max-lg": { max: "989px" },
        "max-md": { max: "799px" },
        "max-sm": { max: "640px" },
        "max-xsm": { max: "479px" },
      },
    },
  },
  plugins: [],
};
