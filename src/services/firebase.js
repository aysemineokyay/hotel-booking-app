import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import { ReactNativeAsyncStorage } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWxIHqucgRu3xRGv4xTf947ohBUj99W9Q",
  authDomain: "hotel-booking-app-571f2.firebaseapp.com",
  projectId: "hotel-booking-app-571f2",
  storageBucket: "hotel-booking-app-571f2.appspot.com",
  messagingSenderId: "897628959050",
  appId: "1:897628959050:web:20a4a278249d02a53a11b3",
};

// Initialize Firebase
const reactNativePersistence = firebaseAuth.getReactNativePersistence;
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage),
});
