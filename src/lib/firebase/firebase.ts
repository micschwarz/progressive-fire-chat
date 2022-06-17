import { initializeApp } from 'firebase/app';
import { initAuth } from './auth/auth';
import { initCloudMessaging } from './cloud_messaging/cloud_messaging';
import { firebaseConfig } from './firebase_config';
import { initFirestore } from './firestore/firestore';

export const initFirebase = () => {
    const app = initializeApp(firebaseConfig);
    initAuth(app);
    initFirestore(app);
    initCloudMessaging(app);
};
