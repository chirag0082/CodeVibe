import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
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

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;