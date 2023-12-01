import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCTx-vgovENB0YtmiCEXk4I5FsYLIDafj8",
    authDomain: "web-app-9abe7.firebaseapp.com",
    projectId: "web-app-9abe7",
    storageBucket: "web-app-9abe7.appspot.com",
    messagingSenderId: "414567470405",
    appId: "1:414567470405:web:46043a1ee14c8c61c61a2c",
    measurementId: "G-Q79XV9S54S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Functions for Google and Facebook login
function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(/* ... */).catch(/* ... */);
}

function facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(/* ... */).catch(/* ... */);
}
