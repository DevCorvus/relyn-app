import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;
export const isLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;