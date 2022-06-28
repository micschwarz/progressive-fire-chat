/// <reference lib="webworker" />

import { precacheAssets, validateCache } from './cache';
import { fetchNetworkFirst } from './fetchStrategies';
import { initNotifications } from './notifications';

const worker = self as unknown as ServiceWorkerGlobalScope;

initNotifications();

worker.addEventListener('install', (event) => {
    event.waitUntil(install());
});

worker.addEventListener('activate', (event) => {
    event.waitUntil(activate());
});

worker.addEventListener('fetch', (event) => {
    const request = event.request;

    if (!isOwnRequest(request)) {
        return;
    }

    event.respondWith(fetchNetworkFirst(request));
});

const install = async () => {
    await precacheAssets();
    await worker.skipWaiting();
};

const activate = async () => {
    await validateCache();
    await worker.clients.claim();
};

const isOwnRequest = (request: Request): boolean => {
    const requestUrl = new URL(request.url);
    const workerUrl = self.location;

    // Ignore POST requests and requests that target other hosts such as firebase
    return request.method === 'GET' && requestUrl.host === workerUrl.host;
};
