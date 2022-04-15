// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCn8vBMmJQokrRHShND7ZNjY2Y5elWJhGY',
    authDomain: 'blog-heyfe.firebaseapp.com',
    projectId: 'blog-heyfe',
    storageBucket: 'blog-heyfe.appspot.com',
    messagingSenderId: '431099065169',
    appId: '1:431099065169:web:415a96b70fdf74b3e71970',
    measurementId: 'G-NF9S8YGKXK'
};

// Initialize Firebase
if (typeof window !== 'undefined') {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
}
