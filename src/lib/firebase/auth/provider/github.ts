import type { User } from '$lib/user/user';
import { currentUser } from '$lib/user/userStore';
import { getAuth, GithubAuthProvider, signInWithPopup, type Auth, type UserCredential } from 'firebase/auth';

const github = new GithubAuthProvider();
github.setCustomParameters({
    allow_signup: 'false',
});

export const login = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, github);
};
