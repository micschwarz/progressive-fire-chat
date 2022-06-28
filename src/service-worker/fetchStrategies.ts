/// <reference lib="webworker" />

import { getCacheForPath } from './cache';

export const fetchNetworkFirst = async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const cache = await getCacheForPath(url.pathname);

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
