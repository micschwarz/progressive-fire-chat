import { browser } from '$app/env';
import { readable, type Readable } from 'svelte/store';

const createNetworkStatusStore = (): Readable<boolean> => {
    if (!browser) {
        return readable(true);
    }

    return readable(navigator.onLine, (set) => {
        set(navigator.onLine);
        const online = () => set(true);
        const offline = () => set(false);
        window.addEventListener('online', online);
        window.addEventListener('offline', offline);

        return () => {
            window.removeEventListener('online', online);
            window.removeEventListener('offline', offline);
        };
    });
};

export const networkStatus = createNetworkStatusStore();