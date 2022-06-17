/// <reference lib="webworker" />

import { precacheAssets, validateCache } from './cache';
import { fetchNetworkFirst } from './fetch';
import { version } from '$service-worker';

const worker = self as unknown as ServiceWorkerGlobalScope;

worker.addEventListener('install', (event) => {
    console.log(`Serviceworker v${version} will install`);
    event.waitUntil(install());
});

worker.addEventListener('activate', (event) => {
    console.log(`Serviceworker v${version} will activate`);
    event.waitUntil(activate());
});

worker.addEventListener('fetch', (event) => {
    const request = event.request;

    const requestUrl = new URL(request.url);
    const workerUrl = self.location;

    // Ignore POST requests and requests that target other hosts such as firebase
    if (request.method !== 'GET' || requestUrl.host !== workerUrl.host) {
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
