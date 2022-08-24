import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./common/components/Navbar";
import { useAppSelector } from "./common/hooks/useAppRedux";
import Home from "./pages/Home";
import Register from "./pages/Register";
// import Signin from "./pages/Signin";

import "react-toastify/dist/ReactToastify.css";
import Activate from "./pages/Activate";

const App = () => {
  const auth = useAppSelector(({ auth }) => auth);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/signin"
            element={!auth ? <Signin /> : <Navigate to="/" />}
          /> */}
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route path="/user/activate/:token" element={<Activate />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
