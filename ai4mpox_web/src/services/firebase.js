// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC3-fiG9IV0JmwDxmp_1kvOM8UDa21xSWE',
  authDomain: 'enssa---knust.firebaseapp.com',
  databaseURL: 'https://enssa---knust-default-rtdb.firebaseio.com',
  projectId: 'enssa---knust',
  storageBucket: 'enssa---knust.appspot.com',
  messagingSenderId: '920074160023',
  appId: '1:920074160023:web:47ab759d1f5dcd9c9426d2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
