import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";

const Navbar = () => {
  const store = useSelector((state) => state);
  console.log(store);
  
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();

  const handleSignOut = () => {
    navigate("/");
    setUser(null);
  };

  return (
    <div className="nav__bg">
      <div className="container nav__container">
        <div className="nav__item">
          <Link to="/" className="nav__title">
            MERN Authentication
          </Link>
        </div>
        <div className="nav__item">
          {user ? (
            <div onClick={handleSignOut} className="btn">
              Sign Out
            </div>
          ) : (
            <Link to="/signin" onClick={() => setUser(true)} className="btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
