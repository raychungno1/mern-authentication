import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserShield } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md";
import {
  CredentialResponse,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import jwt_decode from "jwt-decode";

import Button from "../common/components/Button";

import {
  useGoogleLoginMutation,
  useLoginMutation,
} from "../store/auth/auth.api";
import { authenticate } from "../store/auth/auth.slice";
import { useAppDispatch } from "../common/hooks/useAppRedux";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();
  const isLoading = isLoginLoading || isGoogleLoading;

  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && password) {
      try {
        const data = await login(formData).unwrap();
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(authenticate({ token: data.token, user: data.user }));
      } catch (error: any) {
        toast.error(
          error.data.error || "There was an error registering. Try again.",
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      }
    } else {
      toast.error(
        <div>
          <p>Please fill all fields. Missing:</p>
          <ul className="list-disc ml-4 text-xs">
            {!email && <li>Email</li>}
            {!password && <li>Password</li>}
          </ul>
        </div>,
        { toastId: "missing-data", position: toast.POSITION.BOTTOM_RIGHT }
      );
    }
  };

  const handleGoogleLogin = async (response: CredentialResponse) => {
    try {
      const data = await googleLogin({
        credential: response.credential,
      }).unwrap();
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(authenticate({ token: data.token, user: data.user }));
    } catch (error: any) {
      toast.error("Google login error.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto mt-16 p-8 rounded-2xl bg-white">
      <form className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
          <FaUserShield className="ml-1" />
        </div>
        <p className="text-2xl w-full font-bold mt-4 mb-2">Sign In</p>
        <p className="w-full mb-8">Login to access your account</p>
        <div className="w-full mb-8">
          <TextField
            name="email"
            value={email}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoMail className="text-2xl text-black" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="w-full mb-8">
          <TextField
            name="password"
            value={password}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            autoComplete="current-password"
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdVpnKey className="text-2xl text-black" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword((prevShowPassword) => !prevShowPassword)
                    }
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <button
          className={`w-full ${isLoading ? "opacity-80" : ""}`}
          disabled={isLoading}
        >
          <Button className="w-full text-center flex items-center justify-center">
            {isLoading ? (
              <CircularProgress
                className="my-1"
                size={32}
                sx={{ color: "grey.200" }}
              />
            ) : (
              <p className="px-8 py-2">Sign In</p>
            )}
          </Button>
        </button>
        <div className="w-full my-6">
          <Divider>Or Sign In With</Divider>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Error")}
        />
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
      </form>
    </div>
  );
};

export default Login;
