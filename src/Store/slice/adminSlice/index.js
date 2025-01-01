import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    userName: "",
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userName = "";
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = adminSlice.actions;

export default adminSlice.reducer;
