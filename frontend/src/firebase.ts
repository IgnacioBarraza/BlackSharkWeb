// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDue6DGYNAVbv-xhfFTQMgO5NsOdpQLMOs",
  authDomain: "blacksharkstudiosweb.firebaseapp.com",
  projectId: "blacksharkstudiosweb",
  storageBucket: "blacksharkstudiosweb.appspot.com",
  messagingSenderId: "1010271293448",
  appId: "1:1010271293448:web:5111f4fb2a884ad13bc1bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);