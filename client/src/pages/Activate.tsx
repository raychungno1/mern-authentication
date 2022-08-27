import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../common/components/Button";

import { useAppDispatch, useAppSelector } from "../common/hooks/useAppRedux";
import { useActivateMutation } from "../store/auth/auth.api";
import { authenticate } from "../store/auth/auth.slice";

const Activate = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(({ auth }) => auth);

  const { token } = useParams();
  const [activate, { isLoading = true }] = useActivateMutation();
  const [success, setSuccess] = useState(false);
  const [displayMessage, setDisplayMessage] = useState("");

  const activateAccount = async (token?: string) => {
    try {
      setSuccess(false);
      const data = await activate({ token }).unwrap();
      setDisplayMessage(data.message);
      toast.success(data.message, {
        toastId: "activate-success",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      setSuccess(true);
      dispatch(authenticate({ token: data.token, user: data.user }));
    } catch (error: any) {
      setDisplayMessage(error.data.error);
      toast.error(error.data.error, {
        toastId: "server-error",
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    if (auth) navigate("/");
    activateAccount(token);
  }, []);

  return (
    <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto my-16 p-8 rounded-2xl bg-white flex flex-col items-center text-center shadow-lg">
      {isLoading ? (
        <>
          <div className="w-24 h-24 rounded-full bg-gray-400 text-6xl text-white flex items-center justify-center">
            <CircularProgress size={60} sx={{ color: "grey.200" }} />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">
            Verifying Account...
          </p>
        </>
      ) : success ? (
        <>
          <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
            <BsCheckLg />
          </div>
          <p className="text-2xl w-full font-bold my-4">Signup successful!</p>
          <Link to="/">
            <Button className="px-8 py-2">Continue to Site</Button>
          </Link>
        </>
      ) : (
        <>
          <div className="w-24 h-24 rounded-full bg-[#cd7871] text-6xl text-white flex items-center justify-center">
            <BsXLg />
          </div>
          <p className="text-2xl w-full font-bold mt-4 mb-2">Signup failed</p>
          <p className="w-full mb-4">{displayMessage}</p>
          <Link to="/register">
            <Button className="px-8 py-2">Sign up</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Activate;
