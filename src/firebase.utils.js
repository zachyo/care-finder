import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBJyhiyIrabNRYUsprVXfd8H_hc0j-MsA8",
  authDomain: "carefinder-c0f35.firebaseapp.com",
  projectId: "carefinder-c0f35",
  storageBucket: "carefinder-c0f35.appspot.com", 
  messagingSenderId: "509123082325",
  appId: "1:509123082325:web:a0d6c26f508ba952253cdc",
  measurementId: "G-MZ6HRE9MXR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
const analytics = getAnalytics(app);

// export { auth, analytics };