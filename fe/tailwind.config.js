/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'custom-blue': '#6A94FF',
                'custom-border': '#E6E6E6',
            },
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                harabara: ['Harabara', 'sans-serif'],
            },
            backgroundImage: {
                'custom-bg': "url('/Background.png')",
            },
            keyframes: {
                shine: {
                    '0%': { 'background-position': '100%' },
                    '100%': { 'background-position': '-100%' },
                },
            },
            animation: {
                shine: 'shine 5s linear infinite',
            },
        },
    },
    plugins: [],
}