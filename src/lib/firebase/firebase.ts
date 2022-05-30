import { initializeApp } from 'firebase/app';
import { initAuth } from './auth/auth';
import { initFirestore } from './firestore/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCqfsuXybFZNKbaef0IbiuOmmx1Vh2TJDU',
    authDomain: 'progressive-fire-chat.firebaseapp.com',
    projectId: 'progressive-fire-chat',
    storageBucket: 'progressive-fire-chat.appspot.com',
    messagingSenderId: '432825278201',
    appId: '1:432825278201:web:00127bc2ebba12eb8b8c28',
};

export const initFirebase = () => {
    const app = initializeApp(firebaseConfig);
    initAuth(app);
    initFirestore(app);
};
