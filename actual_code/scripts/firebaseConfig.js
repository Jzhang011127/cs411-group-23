// firebaseConfig.js

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "Your_Firebase_API_Key",
    authDomain: "Your_Firebase_Auth_Domain",
    // ... other Firebase configurations
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

// Add more Firebase services as needed
