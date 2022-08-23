import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../common/interfaces/auth.interface";

const getAuthInfo = () => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    return JSON.parse(profile) as AuthState;
  }
  return null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getAuthInfo(),
  reducers: {
    authenticate(state, action: { payload: AuthState; type: string }) {
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return action.payload;
    },
    logout(state) {
      localStorage.removeItem("profile");
      return null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
