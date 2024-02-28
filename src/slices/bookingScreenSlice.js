import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../services/firebase";

const initialState = {
  rezervations: [],
  hotelsData: [],
  roomTypeData: [],
  status: "idle",
  error: null,
};
export const getRezervations = createAsyncThunk(
  "bookingScreen/getRezervations",
  async () => {
    const rezervationsRef = collection(db, "rezervations");
    const q = query(
      rezervationsRef,
      where("userId", "==", auth.currentUser.uid)
    );
    const snapshot = await getDocs(q);
    const rezervations = snapshot.docs.map((docs) => {
      const id = docs.id;
      const rezervationsData = docs.data();
      return {
        id: id,
        hotelId: rezervationsData.hotelId,
        roomTypeId: rezervationsData.roomTypeId.id,
        guestCount: rezervationsData.guestCount,
        childCount: rezervationsData.childCount,
        adultCount: rezervationsData.adultCount,
        checkInDate: rezervationsData.checkInDate,
        checkOutDate: rezervationsData.checkOutDate,
        roomCount: rezervationsData.roomCount,
        totalPrice: rezervationsData.totalPrice,
        userId: rezervationsData.userId,
      };
    });
    var hotelRefData = await getDoc(rezervations[0].hotelId);
    console.log("data:", hotelRefData.data());
    return rezervations;
  }
);

export const getHotelDataOfRezervations = createAsyncThunk(
  "bookingScreen/getHotelDataOfRezervations",
  async (hotelId) => {
    const hotelsRef = collection(db, "hotels");
    const q = query(hotelsRef, where("id", "==", hotelId));
    const snapshot = await getDocs(q);
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
  }
);
const bookingScreenSlice = createSlice({
  name: "bookingScreen",
  initialState: initialState,
  reducers: {
    setRezervations: (state, action) => {
      state.rezervations = action.payload;
    },
    setHotelsData: (state, action) => {
      state.hotelsData = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRezervations.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getRezervations.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getRezervations.fulfilled, (state, action) => {
      state.status = "idle";
      state.rezervations = action.payload;
    });
    builder.addCase(getHotelDataOfRezervations.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(getHotelDataOfRezervations.rejected, (state, action) => {
      state.status = "failed";
      state.status = action.error.message;
    });
    builder.addCase(getHotelDataOfRezervations.fulfilled, (state, action) => {
      state.status = "idle";
      state.hotelsData = action.payload;
    });
  },
});

export const selectRezervations = (state) => state.bookingScreen.rezervations;
export const selectHotelsData = (state) => state.bookingScreen.hotelsData;
export const selectStatus = (state) => state.bookingScreen.status;
export const selectError = (state) => state.bookingScreen.error;
export const { setRezervations, setHotelsData } = bookingScreenSlice.actions;
export default bookingScreenSlice;
