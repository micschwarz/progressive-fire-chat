import type { FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';

export const initFirestore = (app: FirebaseApp) => {
    const db = getFirestore(app);
    if (import.meta.env.DEV) {
        connectFirestoreEmulator(db, 'localhost', 8080);
    }
    enableMultiTabIndexedDbPersistence(db).catch((err) => {
        console.log(err);
    });
};
