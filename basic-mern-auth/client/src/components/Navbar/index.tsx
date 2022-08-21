import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

import mongo from "../../images/mongo.svg";
import express from "../../images/express.svg";
import react from "../../images/react.svg";
import node from "../../images/node.svg";
import "./styles.css";
import { LOGOUT } from "../../store/authSlice";
import { useGetAuth } from "../../hooks/useGetAuth";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const navigate = useNavigate();
  const { auth, setAuth } = useGetAuth();

  const handleSignOut = () => {
    dispatch(LOGOUT());
    setAuth(null);
    navigate("/");
  };

  return (
    <div className="nav__bg">
      <div className="container nav__container">
        <Link to="/" className="nav__title">
          <div className="nav__item nav__logo">
            <div className="nav__letter">
              <div className="nav__icon" style={{ background: "#52584a" }}>
                <img src={mongo} alt="" style={{ width: 75, height: 75 }} />
              </div>
              <div className="nav__icon-label" style={{ color: "#6cac48" }}>
                M
              </div>
            </div>
            <div className="nav__letter">
              <div className="nav__icon" style={{ background: "#cd7871" }}>
                <img src={express} alt="" style={{ width: 50, height: 50 }} />
              </div>
              <div className="nav__icon-label" style={{ color: "#cd7871" }}>
                E
              </div>
            </div>
            <div className="nav__letter">
              <div className="nav__icon" style={{ background: "#24618e" }}>
                <img src={react} alt="" style={{ width: 50, height: 50 }} />
              </div>
              <div className="nav__icon-label" style={{ color: "#24618e" }}>
                R
              </div>
            </div>
            <div className="nav__letter">
              <div className="nav__icon" style={{ background: "#9bc148" }}>
                <img src={node} alt="" style={{ width: 50, height: 50 }} />
              </div>
              <div className="nav__icon-label" style={{ color: "#9bc148" }}>
                N
              </div>
            </div>
          </div>
        </Link>
        <div className="nav__item">
          {auth ? (
            <div onClick={handleSignOut} className="btn">
              Sign Out
            </div>
          ) : (
            <Link to="/signin" className="btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
