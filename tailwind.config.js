/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            screens: {
                "2xl": { max: "1535px" },
                // => @media (max-width: 1535px) { ... }

                xl: { max: "1279px" },
                // => @media (max-width: 1279px) { ... }

                lg: { max: "1024px" },
                // => @media (max-width: 1024px) { ... }

                md: { max: "800px" },
                // => @media (max-width: 800px) { ... }

                sm: { max: "660" },
                // => @media (max-width: 650px) { ... }

                xs: { max: "576px" },
                // => @media (max-width: 400px) { ... }
            },
        },
    },
    plugins: [],
};
