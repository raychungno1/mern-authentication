import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaQuestion } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdMarkEmailRead } from "react-icons/md";
import { CircularProgress } from "@mui/material";

import Button from "../common/components/Button";
import Input from "../common/components/Input";

import { useAppDispatch } from "../common/hooks/useAppRedux";
import { useForgetPasswordMutation } from "../store/auth/auth.api";

const initialState = {
  email: "",
};

const Forget = () => {
  const dispatch = useAppDispatch();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const [formData, setFormData] = useState(initialState);
  const { email } = formData;

  const [success, setSuccess] = useState(false);

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) {
      try {
        const data = await forgetPassword(formData).unwrap();
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        setSuccess((prev) => !prev);
      } catch (error: any) {
        toast.error(error.data.error || "There was an error. Try again.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } else {
      toast.error("Email is required.", {
        toastId: "missing-data",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return (
    <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto my-16 p-8 rounded-2xl bg-white shadow-lg">
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
            Password Reset Email Sent
          </p>
          <p className="w-full">
            Check your inbox at {email} to reset your password. Email may take a few minutes...
          </p>
        </div>
      ) : (
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
            <FaQuestion />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">Forgot Password</p>
          <p className="w-full mb-8">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
          <div className="w-full mb-8">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              startAdornment={<IoMail className="text-2xl text-black" />}
              value={email}
              onChange={handleChange}
              isLoading={isLoading}
              autoFocus
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
                <p className="px-8 py-2">Continue</p>
              )}
            </Button>
          </button>
          <Link
            className="ml-auto uppercase text-xs mt-4 lg:mt-8 hover:underline"
            to="/register"
          >
            Don't have an account? Sign up
          </Link>
        </form>
      )}
    </div>
  );
};

export default Forget;
