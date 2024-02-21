import { configureStore } from "@reduxjs/toolkit";
import homeScreenSlice from "../slices/homeScreenSlice.js";
import bookingScreenSlice from "../slices/bookingScreenSlice.js";
import routerSlice from "../slices/routerSlice.js";
import welcomeScreenSlice from "../slices/welcomeScreenSlice.js";

export const store = configureStore({
  reducer: {
    homeScreen: homeScreenSlice.reducer,
    bookingScreen: bookingScreenSlice.reducer,
    router: routerSlice.reducer,
    welcomeScreen: welcomeScreenSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
