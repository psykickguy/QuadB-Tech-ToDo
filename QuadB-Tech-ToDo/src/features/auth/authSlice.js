import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  city: JSON.parse(localStorage.getItem("city")) || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.username;
      state.city = action.payload.city;
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("user", JSON.stringify(action.payload.username));
      localStorage.setItem("city", JSON.stringify(action.payload.city));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.city = "";
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
      localStorage.removeItem("city");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
