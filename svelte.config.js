import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter({
            fallback: 'index.html',
        }),
        serviceWorker: {
            register: false,
            files: (path) => {
                return !path.includes('app_icons');
            },
        },
        vite: {
            ssr: {
                noExternal: [
                    '@fortawesome/fontawesome-svg-core',
                    '@fortawesome/free-regular-svg-icons',
                    '@fortawesome/free-solid-svg-icons',
                ],
            },
        },
    },
};

export default config;
