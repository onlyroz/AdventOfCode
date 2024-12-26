/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './index.html',
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'europe': {
                    'dark': '#0060A1',
                    'light': '#009EE3',
                    'wash': '#E5F4FD'
                },
                'cto': {
                    'dark': '#2C3E3C',
                    'light': '#5D6B62',
                    'wash': '#E5E2E2'
                }
            }
        },
        container: {
            center: true,
        },
        fontFamily: {
            sans: ['OpenSans', ...defaultTheme.fontFamily.sans]
        }
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
}