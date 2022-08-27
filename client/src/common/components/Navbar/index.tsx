import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppRedux";
import { logout } from "../../../store/auth/auth.slice";

import mongo from "../../images/mongo.svg";
import express from "../../images/express.svg";
import react from "../../images/react.svg";
import node from "../../images/node.svg";
import Button from "../Button";
import { googleLogout } from "@react-oauth/google";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(({ auth }) => auth);

  const authOptions = [
    { value: "Home", onClick: () => navigate("/") },
    { value: "Profile", onClick: () => navigate("/profile") },
    {
      value: "Sign Out",
      onclick: () => {
        handleSignout();
        toast.success("You have signed out.", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      },
    },
  ];

  const noAuthOptions = [
    { value: "Home", onClick: () => navigate("/") },
    { value: "Sign In", onClick: () => navigate("/signin") },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignout = () => {
    googleLogout();
    dispatch(logout());
  };

  useEffect(() => {
    const token = auth?.token;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleSignout();
    }
  }, []);

  return (
    <div className="z-50 border-b-2 backdrop-blur-sm overflow-x-hidden">
      <div className="container mx-auto px-4 mt-2 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center justify-between gap-2 text-2xl"
        >
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
        <div className="flex sm:hidden">
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MdMenu />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
            {auth
              ? authOptions.map(({ value, onClick }) => (
                  <MenuItem key={value} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={onClick}>
                      {value}
                    </Typography>
                  </MenuItem>
                ))
              : noAuthOptions.map(({ value, onClick }) => (
                  <MenuItem key={value} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" onClick={onClick}>
                      {value}
                    </Typography>
                  </MenuItem>
                ))}
          </Menu>
        </div>
        {auth ? (
          <div className="hidden sm:flex gap-6 items-center">
            <Link to="/profile" className="uppercase font-bold hover:underline">
              Profile
            </Link>
            <Button
              className="px-8 py-2"
              onClick={() => {
                handleSignout();
                toast.success("You have signed out.", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
              }}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <Link to="/signin" className="hidden sm:block">
            <Button className="px-8 py-2">Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
