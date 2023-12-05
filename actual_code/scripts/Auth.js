import { auth, GoogleAuthProvider, signInWithPopup } from './firebaseConfig';

export const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // Google Access Token
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // ...
        }).catch((error) => {
            // Handle Errors
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });
};

export const signOut = () => {
    auth.signOut().then(() => {
        // Sign-out successful
    }).catch((error) => {
        // An error happened
    });
};
