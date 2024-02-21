import { collection, getDocs } from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../services/firebase";

const initialState = {
  hotels: [],
  status: "idle",
  error: null,
};

export const getHotels = createAsyncThunk("homeScreen/getHotels", async () => {
  const hotelsRef = collection(db, "hotels");
  const snapshot = await getDocs(hotelsRef);
  const hotels = snapshot.docs.map((docs) => {
    const hotelsData = docs.data();
    return { data: hotelsData };
  });
  return hotels;
});

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState: initialState,
  reducers: {
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getHotels.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getHotels.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getHotels.fulfilled, (state, action) => {
      state.status = "idle";
      state.hotels = action.payload;
    });
  },
});

export const selectHotels = (state) => state.homeScreen.hotels;
export const selectStatus = (state) => state.homeScreen.status;
export const selectError = (state) => state.homeScreen.error;
export const { setHotels } = homeScreenSlice.actions;
export default homeScreenSlice;
