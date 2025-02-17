import { createSlice } from "@reduxjs/toolkit";

const loadUserFromStorage = () => {
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
};

const initialState = {
  user: loadUserFromStorage(), // ✅ Load user from Local Storage
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Store in Local Storage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ Remove from Local Storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
