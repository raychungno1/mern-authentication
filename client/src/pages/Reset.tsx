import React, { ChangeEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { MdVpnKey } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { CircularProgress } from "@mui/material";

import Button from "../common/components/Button";
import Input from "../common/components/Input";

import { useResetPasswordMutation } from "../store/auth/auth.api";

const initialState = {
  password: "",
  confirmPassword: "",
};

const Reset = () => {
  const { token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState(initialState);
  const { password, confirmPassword } = formData;

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
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const data = await resetPassword({
            token,
            password,
          }).unwrap();
          toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          setSuccess((prev) => !prev);
        } catch (error: any) {
          toast.error(
            error.data.error ||
              "There was an error resetting your password. Try again.",
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
            {!password && <li>Password</li>}
            {!confirmPassword && <li>Confirm Password</li>}
          </ul>
        </div>,
        { toastId: "missing-data", position: toast.POSITION.BOTTOM_RIGHT }
      );
    }
  };

  return (
    <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto my-16 p-8 rounded-2xl bg-white shadow-lg">
      {success ? (
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
            <BsCheckLg />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">
            Password Reset Successful
          </p>
          <p className="w-full mb-4">Login again to access your account.</p>
          <Link to="/signin">
            <Button className="px-8 py-2">Sign In</Button>
          </Link>
        </div>
      ) : (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
            <FaUserEdit className="ml-1" />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">
            Create new password
          </p>
          <p className="w-full mb-8">
            Your new password must be different from previous used passwords.
          </p>
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
                <p className="px-8 py-2">Reset Password</p>
              )}
            </Button>
          </button>
        </form>
      )}
    </div>
  );
};

export default Reset;
