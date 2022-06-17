/// <reference lib="webworker" />

import { build, files, version } from '$service-worker';

const cachesAvailable = {
    assets: `assets_v${version}`,
    requests: `requests_v${version}`,
};

type cacheNamesAvailable = keyof typeof cachesAvailable;

const assets = Array.from(new Set([...build, ...files]));

export const isAsset = (file: string) => assets.includes(file);

export const precacheAssets = async () => {
    const cache = await getCache('assets');
    await cache.addAll(assets);
};

export const validateCache = async () => {
    const cachesAvailable = await caches.keys();
    const cachesValid = Array.from(cachesAvailable.values());
    const cachesInvalid = cachesAvailable.filter((key) => !cachesValid.includes(key));
    for (const cache of cachesInvalid) {
        await caches.delete(cache);
    }
};

export const getCache = async (name: cacheNamesAvailable): Promise<Cache> => {
    return await caches.open(name);
};
