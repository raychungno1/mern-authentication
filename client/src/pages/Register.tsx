import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFacebookF, FaUserCircle, FaUserPlus } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import {
  MdVpnKey,
  MdVisibility,
  MdVisibilityOff,
  MdMarkEmailRead,
} from "react-icons/md";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import Button from "../common/components/Button";

import {
  useFacebookLoginMutation,
  useGoogleLoginMutation,
  useRegisterMutation,
} from "../store/auth/auth.api";
import { authenticate } from "../store/auth/auth.slice";
import { useAppDispatch } from "../common/hooks/useAppRedux";
import Input from "../common/components/Input";
import Auth from "../common/components/Auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [success, setSuccess] = useState(false);

  return (
    <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto mt-16 p-8 rounded-2xl bg-white">
      {success ? (
        <div className="flex flex-col items-center text-center">
          <div
            className="w-full text-left uppercase text-xs cursor-pointer hover:underline"
            onClick={() => setSuccess((prev) => !prev)}
          >
            {"<"} Back
          </div>
          <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
            <MdMarkEmailRead />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">
            Verification Email Sent
          </p>
          <p className="w-full">
            Check your inbox to verify your account.
          </p>
        </div>
      ) : (
        <>
          <Auth type="register" setSuccess={setSuccess} />
          <div className="w-full flex flex-col lg:flex-row items-center justify-between">
            <Link
              className="ml-auto text-right uppercase text-xs mt-8 hover:underline"
              to="/signin"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
