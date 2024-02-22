import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const routerSlice = createSlice({
  name: "router",
  initialState: initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const selectCurrentUser = (state) => state.router.currentUser;
export const { setCurrentUser } = routerSlice.actions;
export default routerSlice;
