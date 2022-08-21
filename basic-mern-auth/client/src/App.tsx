import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import { useGetAuth } from "./hooks/useGetAuth";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

import store from "./store";

const App = () => {
  const { auth } = useGetAuth();

  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
      >
        <Navbar />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/signin" />}
            />
            <Route
              path="/signin"
              element={!auth ? <Signin /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!auth ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
