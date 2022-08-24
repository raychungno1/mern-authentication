import React, { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCircle, FaUserPlus } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";

import Button from "../../common/components/Button";

import { useAppDispatch, useAppSelector } from "../../common/hooks/useAppRedux";
import { useRegisterMutation } from "../../store/auth/auth.api";
import {
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import "./styles.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const state = useAppSelector((state) => state);
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
          setSuccess((prev) => !prev);
        } catch (error: any) {
          toast.error(
            error.data.error || "There was an error registering. Try again.",
            {
              toastId: "server-error",
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
            <BsCheckLg className="ml-1" />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">
            Verification Email Sent
          </p>
          <p className="w-full">
            Check your inbox at {email} to verify your account.
          </p>
        </div>
      ) : (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
            <FaUserPlus className="ml-1" />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">Sign Up</p>
          <p className="w-full mb-8">Create an account to get started</p>
          <div className="w-full md:flex items-center gap-4 mb-8">
            <TextField
              className="w-full"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              label="First Name"
              type="firstName"
              placeholder="First Name"
              autoFocus
              autoComplete="given-name"
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUserCircle className="text-2xl text-black" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              className="w-full"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              label="Last Name"
              type="lastName"
              placeholder="Last Name"
              autoComplete="family-name"
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUserCircle className="text-2xl text-black" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
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
              autoComplete="new-password"
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
          <div className="w-full mb-8">
            <TextField
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              autoComplete="new-password"
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
                        setShowConfirmPassword(
                          (prevShowComfirmPassword) => !prevShowComfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? (
                        <MdVisibility />
                      ) : (
                        <MdVisibilityOff />
                      )}
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
                <p className="px-8 py-2">Sign Up</p>
              )}
            </Button>
          </button>
          {/* <div className="w-full my-6">
            <Divider>Or Sign In With</Divider>
          </div>
          <Button className="w-full text-center">
            <p className="px-8 py-2">Google</p>
          </Button> */}
          {/* <p className="form__subtitle-2">Or Sign In With </p>
        <div style={{ marginBottom: "2rem" }}>
          <GoogleLogin
            onSuccess={signinGoogle}
            onError={() => console.log("Error")}
          />
        </div> */}
          <Link
            className="ml-auto text-right uppercase text-xs mt-8 hover:underline"
            to="/signin"
          >
            Already have an account? Sign in
          </Link>
        </form>
      )}
    </div>
  );
};

export default Register;
