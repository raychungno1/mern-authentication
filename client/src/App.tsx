import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./common/components/Navbar";
import { useAppSelector } from "./common/hooks/useAppRedux";
import Home from "./pages/Home";
import Register from "./pages/Register.jsx";
import Signin from "./pages/Signin";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const auth = useAppSelector(({ auth }) => auth);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={!auth ? <Signin /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
