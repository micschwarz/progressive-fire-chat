import { browser } from '$app/env';

const register = (): Promise<ServiceWorkerRegistration | null> =>
    new Promise(async (resolve) => {
        if (!navigator.serviceWorker) {
            return resolve(null);
        }

        let registration: ServiceWorkerRegistration;
        try {
            registration = await navigator.serviceWorker.register('./service-worker.js');
        } catch (_) {
            return resolve(null);
        }
        const serviceWorker = registration.installing ?? registration.waiting ?? registration.active;

        if (!serviceWorker) {
            return resolve(null);
        }

        if (serviceWorker.state === 'activated') {
            return resolve(registration);
        }

        serviceWorker.addEventListener('statechange', () => {
            if (serviceWorker.state === 'activated') {
                return resolve(registration);
            }
        });
    });

export const serviceworkerRegistration = browser ? register() : null;
