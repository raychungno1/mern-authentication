import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Activate from "./pages/Activate";
import Login from "./pages/Login";
import Forget from "./pages/Forget";
import Reset from "./pages/Reset";
import Navbar from "./common/components/Navbar";

import { useAppSelector } from "./common/hooks/useAppRedux";
import "react-toastify/dist/ReactToastify.css";
import SkewBg from "./common/components/SkewBg";
import Profile from "./pages/Profile";

const App = () => {
  const location = useLocation();
  const auth = useAppSelector(({ auth }) => auth);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      {location.pathname !== "/" && <SkewBg />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={!auth ? <Register /> : <Navigate to="/" />}
        />
        <Route path="/user/activate/:token" element={<Activate />} />
        <Route
          path="/signin"
          element={!auth ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/user/password/forget"
          element={!auth ? <Forget /> : <Navigate to="/" />}
        />
        <Route
          path="/user/password/reset/:token"
          element={!auth ? <Reset /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={auth ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
