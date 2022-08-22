import { createSlice } from "@reduxjs/toolkit";
import { IAuthStore } from "../common/interfaces/auth.interface";

const getAuthInfo = () => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    return JSON.parse(profile) as IAuthStore;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getAuthInfo(),
  reducers: {
    AUTH(state, action: { payload: IAuthStore; type: string }) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return action.payload;
    },
    LOGOUT(state) {
      localStorage.removeItem("profile");
      return null;
    },
  },
});

export const { AUTH, LOGOUT } = authSlice.actions;
export default authSlice.reducer;
