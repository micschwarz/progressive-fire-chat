import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCqfsuXybFZNKbaef0IbiuOmmx1Vh2TJDU',
    authDomain: 'progressive-fire-chat.firebaseapp.com',
    projectId: 'progressive-fire-chat',
    storageBucket: 'progressive-fire-chat.appspot.com',
    messagingSenderId: '432825278201',
    appId: '1:432825278201:web:00127bc2ebba12eb8b8c28',
};

export const app = initializeApp(firebaseConfig);

export let auth = getAuth(app);
if (import.meta.env.DEV) {
    connectAuthEmulator(auth, 'http://localhost:9099');
}
