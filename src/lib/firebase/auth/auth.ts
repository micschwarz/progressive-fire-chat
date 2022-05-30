import type { User } from '$lib/user/user';
import { currentUser } from '$lib/user/userStore';
import type { FirebaseApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, onAuthStateChanged, signOut, type UserCredential } from 'firebase/auth';

type FirebaseUser = UserCredential['user'];
const createUser = (user: FirebaseUser): User => {
    return {
        name: user.displayName ?? 'Anonym',
        id: user.uid,
    };
};

export const initAuth = (app: FirebaseApp) => {
    const auth = getAuth(app);
    if (import.meta.env.DEV) {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    }

    onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
            const user = createUser(firebaseUser);
            currentUser.set(user);
        } else {
            currentUser.set(null);
        }
    });
};

export const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
};
