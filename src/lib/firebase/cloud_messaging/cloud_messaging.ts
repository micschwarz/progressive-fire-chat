import { serviceworkerRegistration } from '$lib/serviceworker';
import type { FirebaseApp } from 'firebase/app';
import { getToken, getMessaging } from 'firebase/messaging';
import { vapidKey } from '../firebase_config';

export const initCloudMessaging = async (app: FirebaseApp) => {
    const sw = await serviceworkerRegistration;
    if (!sw) {
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
        return;
    }

    const messaging = getMessaging(app);
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: sw });
    console.log(token);
};
