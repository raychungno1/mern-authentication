import React, { ChangeEvent, useState } from "react";
import {
  FaFacebookF,
  FaUserCircle,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { IoMail } from "react-icons/io5";
import { MdVpnKey } from "react-icons/md";
import { toast } from "react-toastify";
import { CircularProgress, Divider } from "@mui/material";

import Input from "../Input";
import Button from "../Button";

import { useAppDispatch } from "../../hooks/useAppRedux";
import { authenticate } from "../../../store/auth/auth.slice";
import {
  useFacebookLoginMutation,
  useGoogleLoginMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../../../store/auth/auth.api";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

interface IProps {
  type: "login" | "register";
  setSuccess?: (value: React.SetStateAction<boolean>) => void;
}

const Auth = ({ type, setSuccess }: IProps) => {
  const dispatch = useAppDispatch();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [googleLogin, { isLoading: isGoogleLoading }] =
    useGoogleLoginMutation();
  const [facebookLogin, { isLoading: isFbLoading }] =
    useFacebookLoginMutation();
  const isLoading =
    isLoginLoading || isRegisterLoading || isGoogleLoading || isFbLoading;

  const [formData, setFormData] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && password) {
      try {
        const data = await login(formData).unwrap();
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(authenticate({ token: data.token, user: data.user }));
      } catch (error: any) {
        console.log(error);
        toast.error(
          error.data.error || "There was an error logging in. Try again.",
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

  const handleRegisterSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (firstName && lastName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const data = await register({
            name: `${firstName} ${lastName}`,
            email,
            password,
          }).unwrap();
          toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          if (setSuccess) {
            setSuccess((prev) => !prev);
          }
        } catch (error: any) {
          toast.error(
            error.data.error || "There was an error registering. Try again.",
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        }
      } else {
        toast.error("Passwords don't match.", {
          toastId: "pw-mismatch",
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error(
        <div>
          <p>Please fill all fields. Missing:</p>
          <ul className="list-disc ml-4 text-xs">
            {!firstName && <li>First Name</li>}
            {!lastName && <li>Last Name</li>}
            {!email && <li>Email</li>}
            {!password && <li>Password</li>}
            {!confirmPassword && <li>Confirm Password</li>}
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

  const handleFacebookLogin = async (res: any) => {
    try {
      const data = await facebookLogin({
        userID: res.userID,
        accessToken: res.accessToken,
      }).unwrap();
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      dispatch(authenticate({ token: data.token, user: data.user }));
    } catch (error: any) {
      toast.error("Facebook login error.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <>
      <form
        className="flex flex-col items-center"
        onSubmit={type === "login" ? handleLoginSubmit : handleRegisterSubmit}
      >
        <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
          {type === "login" ? (
            <FaUserShield className="ml-1" />
          ) : (
            <FaUserPlus className="ml-1" />
          )}
        </div>
        <p className="text-2xl w-full font-bold mt-4 mb-2">
          {type === "login" ? "Sign In" : "Sign Up"}
        </p>
        <p className="w-full mb-8">
          {type === "login"
            ? "Login to access your account"
            : "Create an account to get started"}
        </p>
        {type === "register" && (
          <div className="w-full md:flex items-center gap-4 mb-8">
            <Input
              label="First Name"
              type="firstName"
              autoComplete="given-name"
              startAdornment={<FaUserCircle className="text-2xl text-black" />}
              value={firstName}
              onChange={handleChange}
              isLoading={isLoading}
              autoFocus
            />
            <Input
              label="Last Name"
              type="lastName"
              autoComplete="family-name"
              startAdornment={<FaUserCircle className="text-2xl text-black" />}
              value={lastName}
              onChange={handleChange}
              isLoading={isLoading}
            />
          </div>
        )}
        <div className="w-full mb-8">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            startAdornment={<IoMail className="text-2xl text-black" />}
            value={email}
            onChange={handleChange}
            isLoading={isLoading}
            autoFocus={type === "login"}
          />
        </div>
        <div className="w-full mb-8">
          <Input
            label="Password"
            type="password"
            autoComplete="new-password"
            startAdornment={<MdVpnKey className="text-2xl text-black" />}
            value={password}
            onChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
          />
        </div>
        {type === "register" && (
          <div className="w-full mb-8">
            <Input
              label="Confirm Password"
              type="confirmPassword"
              autoComplete="new-password"
              startAdornment={<MdVpnKey className="text-2xl text-black" />}
              value={confirmPassword}
              onChange={handleChange}
              showPassword={showConfirmPassword}
              setShowPassword={setShowConfirmPassword}
              isLoading={isLoading}
            />
          </div>
        )}
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
              <p className="px-8 py-2">
                {type === "login" ? "Sign In" : "Sign Up"}
              </p>
            )}
          </Button>
        </button>
      </form>
      <div className="w-full my-6">
        <Divider>Or Sign In With</Divider>
      </div>
      <div className="flex items-center justify-center gap-4">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Error")}
          type="icon"
        />
        <FacebookLogin
          appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
          fields="name,email,picture"
          callback={handleFacebookLogin}
          render={(renderProps) => (
            <button
              type="button"
              onClick={renderProps.onClick}
              disabled={renderProps.isDisabled}
              className="w-10 h-10 bg-[#4267B2] rounded outline outline-1 outline-[#dadce0] flex items-center justify-center text-white text-lg hover:bg-opacity-95 hover:outline-[#d2e3fc]"
            >
              <FaFacebookF className="mr-[2px]" />
            </button>
          )}
        />
      </div>
    </>
  );
};

export default Auth;
