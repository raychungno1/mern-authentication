import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFacebookF, FaUserShield } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import Button from "../common/components/Button";

import {
  useFacebookLoginMutation,
  useGoogleLoginMutation,
  useLoginMutation,
} from "../store/auth/auth.api";
import { authenticate } from "../store/auth/auth.slice";
import { useAppDispatch } from "../common/hooks/useAppRedux";
import Input from "../common/components/Input";
import Auth from "../common/components/Auth";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  return (
    <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto mt-16 p-8 rounded-2xl bg-white">
      <Auth type="login" />
      <div className="w-full flex flex-col lg:flex-row items-center justify-between">
        <Link
          className="ml-auto lg:ml-0 mr-0 lg:mr-auto uppercase text-xs mt-8 hover:underline"
          to="/user/password/forget"
        >
          Forgot Password?
        </Link>
        <Link
          className="ml-auto uppercase text-xs mt-4 lg:mt-8 hover:underline"
          to="/register"
        >
          Don't have an account? Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
