/// <reference lib="webworker" />

import { firebaseConfig } from '$lib/firebase/firebase_config';
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

export const initNotifications = () => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    onBackgroundMessage(messaging, (payload) => {
        console.log(payload);
    });
};
