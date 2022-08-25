import React from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { authenticate, logout } from "../../../store/auth/auth.slice";

import mongo from "../../images/mongo.svg";
import express from "../../images/express.svg";
import react from "../../images/react.svg";
import node from "../../images/node.svg";
import Button from "../Button";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(({ auth }) => auth);

  const handleSignout = () => {
    dispatch(logout());
  };

  const mockSignin = () => {
    dispatch(
      authenticate({
        user: {
          name: "Test User",
          email: "test.user@gmail.com",
        },
        token: "test-token-123",
      })
    );
  };

  return (
    <div className="container mx-auto my-2 flex items-center justify-between">
      <Link to="/" className="flex items-center justify-between gap-2 text-2xl">
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#52584a]">
            <img src={mongo} alt="" className="w-16 h-16" />
          </div>
          <div className="font-bold text-2xl text-[#6cac48]">M</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#cd7871]">
            <img src={express} alt="" className="w-12 h-12" />
          </div>
          <div className="font-bold text-2xl text-[#cd7871]">E</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#24618e]">
            <img src={react} alt="" className="w-12 h-12" />
          </div>
          <div className="font-bold text-2xl text-[#24618e]">R</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#9bc148]">
            <img src={node} alt="" className="w-12 h-12" />
          </div>
          <div className="font-bold text-2xl text-[#9bc148]">N</div>
        </div>
      </Link>
      <div>
        {auth ? (
          <Button className="px-8 py-2" onClick={handleSignout}>
            Sign Out
          </Button>
        ) : (
          <Link to="/signin">
            <Button className="px-8 py-2">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
