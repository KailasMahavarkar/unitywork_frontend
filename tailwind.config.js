/** @type {import('tailwindcss').Config} */

const daisy = require("daisyui");
const tailwindTypography = require("@tailwindcss/typography");

const childrenSupport = ({ addVariant }) => {
    addVariant("child", "& > *");
    addVariant("child-hover", "& > *:hover");
};

module.exports = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        screen: {
            sm: 425,
            md: 768,
            lg: 1024,
            xl: 1280,
            "2xl": 1440,
        }
    },
    daisyui: {
        styled: true,
        themes: ['dracula', 'light'],
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        darkTheme: "dracula",
    },
    plugins: [tailwindTypography, daisy, childrenSupport],
}

