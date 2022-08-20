import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { authData: null },
  reducers: {
    AUTH(state, action) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state = { ...state, authData: action.payload };
    },
    LOGOUT(state) {
      localStorage.removeItem("profile");
      state = { ...state, authData: null };
    },
  },
});

export const { AUTH, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
