module.exports = {
    content: ['./src/**/*.{html,svelte,ts,js}'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
