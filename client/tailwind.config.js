const colors = require("tailwindcss/colors");
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                default: "1400px",
            },
        },
        colors: {
            ...colors,
            blue: {
                900: "#000DFF",
            },
        },
        extend: {
            fontFamily: {
                Poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
