import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
    const id = docs.id;
    const hotelsData = docs.data();
    return {
      id: id,
      country: hotelsData.country,
      city: hotelsData.city,
      location: hotelsData.location,
      image: hotelsData.image,
      description: hotelsData.description,
      rating: hotelsData.rating,
      name: hotelsData.name,
    };
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
