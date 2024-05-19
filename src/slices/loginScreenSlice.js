import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  password: "123456",
  confirmPassword: null,
  email: "aysemineokyay@gmail.com",
};

const loginScreenSlice = createSlice({
  name: "loginScreen",
  initialState: initialState,
  reducers: {
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const selectPassword = (state) => state.loginScreen.password;
export const selectConfirmPassword = (state) =>
  state.loginScreen.confirmPassword;
export const selectEmail = (state) => state.loginScreen.email;
export const { setPassword } = loginScreenSlice.actions;
export const { setConfirmPassword } = loginScreenSlice.actions;
export const { setEmail } = loginScreenSlice.actions;
export default loginScreenSlice;
