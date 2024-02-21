import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageUrl: null,
};

const welcomeScreenSlice = createSlice({
  name: "welcomeScreen",
  initialState: initialState,
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const selectImageUrl = (state) => state.welcomeScreen.imageUrl;
export const { setImageUrl } = welcomeScreenSlice.actions;
export default welcomeScreenSlice;
