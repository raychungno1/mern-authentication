import React from "react";
import { Link } from "react-router-dom";

import Auth from "../common/components/Auth";

const Login = () => {
  return (
    <>
      <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto my-16 p-8 rounded-2xl bg-white shadow-lg">
        <Auth type="login" />
        <div className="w-full flex flex-col lg:flex-row items-center justify-between">
          <Link
            className="ml-auto lg:ml-0 mr-0 lg:mr-auto uppercase text-xs mt-8 hover:underline"
            to="/user/password/forget"
          >
            Forgot Password?
          </Link>
          <Link
            className="ml-auto uppercase text-xs mt-4 lg:mt-8 hover:underline"
            to="/register"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
