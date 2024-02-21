import { collection, getDocs, query, where } from "firebase/firestore";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../services/firebase";

const initialState = {
  rezervations: [],
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
      const rezervationsData = docs.data();
      return { data: rezervationsData };
    });
    return rezervations;
  }
);

const bookingScreenSlice = createSlice({
  name: "bookingScreen",
  initialState: initialState,
  reducers: {
    setRezervations: (state, action) => {
      state.rezervations = action.payload;
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
  },
});

export const selectRezervations = (state) => state.bookingScreen.rezervations;
export const selectStatus = (state) => state.bookingScreen.status;
export const selectError = (state) => state.bookingScreen.error;
export const { setRezervations } = bookingScreenSlice.actions;
export default bookingScreenSlice;
