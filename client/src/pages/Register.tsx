import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import Auth from "../common/components/Auth";

const Register = () => {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <div className="relative w-1/2 min-w-[360px] max-w-[480px] mx-auto my-16 p-8 rounded-2xl bg-white shadow-lg">
        {success ? (
          <div className="flex flex-col items-center text-center">
            <div
              className="w-full text-left uppercase text-xs cursor-pointer hover:underline"
              onClick={() => setSuccess((prev) => !prev)}
            >
              {"<"} Back
            </div>
            <div className="w-24 h-24 rounded-full bg-[#9bc148] text-6xl text-white flex items-center justify-center">
              <MdMarkEmailRead />
            </div>
            <p className="text-2xl w-full font-bold mt-4 mb-2">
              Verification Email Sent
            </p>
            <p className="w-full">Check your inbox to verify your account. Email may take a few minutes...</p>
          </div>
        ) : (
          <>
            <Auth type="register" setSuccess={setSuccess} />
            <div className="w-full flex flex-col lg:flex-row items-center justify-between">
              <Link
                className="ml-auto text-right uppercase text-xs mt-8 hover:underline"
                to="/signin"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Register;
