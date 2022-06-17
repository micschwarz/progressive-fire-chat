/// <reference lib="webworker" />

import { getCache, isAsset } from './cache';

export const fetchNetworkFirst = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);

    const cacheName = isAsset(url.pathname) ? 'assets' : 'requests';
    const cache = await getCache(cacheName);

    let response;

    try {
        response = await fetch(request);
        await cache.put(request, response.clone());
    } catch (error) {
        response = await cache.match(request);
        if (!response) {
            throw error;
        }
    }

    return response;
};
