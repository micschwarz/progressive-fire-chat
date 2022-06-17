import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

const github = new GithubAuthProvider();
github.setCustomParameters({
    allow_signup: 'false',
});

export const login = async () => {
    const auth = getAuth();
    await signInWithPopup(auth, github);
};
