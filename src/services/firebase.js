import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";

// @ts-ignore
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";

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
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  // @ts-ignore
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
