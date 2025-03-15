import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2RjFkz9Z1bzt8fMXdT6FX_ZkSahktEg0",
    authDomain: "epic-79cec.firebaseapp.com",
    databaseURL: "https://epic-79cec-default-rtdb.firebaseio.com",
    projectId: "epic-79cec",
    storageBucket: "epic-79cec.firebasestorage.app",
    messagingSenderId: "816372499365",
    appId: "1:816372499365:web:2ccffda74bb65207119e4c",
    measurementId: "G-QGFT927NZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google login functionality
const googleLogin = document.getElementById("google-login-btn");
googleLogin.addEventListener("click", function () {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const user = result.user;
            console.log(user);
            window.location.href = "../website.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Error ${errorCode}: ${errorMessage}`);
        });
});

export { auth, db };
