import { AUTH } from "../store/authSlice";
import * as api from "../api/auth";
import { NavigateFunction } from "react-router-dom";
import { AnyAction, Dispatch } from "redux";

export const signin =
  (formData: any, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { data } = await api.signin(formData);
      console.log(data)
      dispatch(AUTH(data));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

export const signup =
  (formData: any, navigate: NavigateFunction) =>
  async (dispatch: Dispatch<AnyAction>) => {
    try {
      const { data } = await api.signup(formData);
      dispatch(AUTH(data));
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
