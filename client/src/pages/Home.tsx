import React from "react";
import {
  FaFacebookF,
  FaGoogle,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import { MdMarkEmailRead, MdPassword } from "react-icons/md";
import { SiJsonwebtokens } from "react-icons/si";
import { Link } from "react-router-dom";
import Button from "../common/components/Button";
import FeatureCard from "../common/components/FeatureCard";
import { useAppSelector } from "../common/hooks/useAppRedux";

import heroBG from "../common/images/hero-bg.png";

const Home = () => {
  const auth = useAppSelector(({ auth }) => auth);

  return (
    <div>
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center">
        <div className="w-full sm:w-[60%] -mx-12">
          <img className="relative w-full -z-10" src={heroBG} />
        </div>
        <div className="w-min mx-auto sm:mx-0 text-center sm:text-left flex flex-col justify-center items-center sm:items-start gap-4">
          <p className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            <span
              className="text-7xl sm:text-8xl lg:text-9xl bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, rgba(254,198,139,1) 0%, rgba(255,69,105,1) 50%, rgba(102,187,245,1) 100%)",
              }}
            >
              MERN
            </span>{" "}
            Authentication
          </p>
          <p className="mb-2">
            A template authentication flow using the MERN stack.
          </p>
          {auth ? (
            <Link to="/profile" className="w-max">
              <Button className="px-8 py-2">View Profile</Button>
            </Link>
          ) : (
            <Link to="/signin" className="w-max">
              <Button className="px-8 py-2">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
      <div className="relative overflow-hidden py-12">
        <div
          className="absolute -z-10 w-full h-[120%] -skew-y-2"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(254,198,139,0.8) 0%, rgba(255,69,105,0.8) 50%, rgba(102,187,245,0.8) 100%)",
          }}
        />
        <div className="container mx-auto px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FaUserShield className="ml-1" />}
            title="Sign In"
            desc="Sign in to your account with an email and password. Includes password reset functionality."
          />
          <FeatureCard
            icon={<FaUserPlus className="ml-1" />}
            title="Sign Up"
            desc="Sign up to create a new account. Sends an activation email to verify accounts."
          />
          <FeatureCard
            icon={<SiJsonwebtokens />}
            title="JWT Tokens"
            desc="Generates JWT tokens to store a user session so you remain logged in. Also used as OAuth 2.0 Bearer Tokens to access secured resources."
          />
          <FeatureCard
            icon={<MdPassword />}
            title="Password Security"
            desc="User passwords are salted & hashed using Bcrypt to ensure safety of your password."
          />
          <FeatureCard
            icon={<FaGoogle />}
            title="Google OAuth"
            desc="Sign in with Google using the Google Identity Services SDK."
          />
          <FeatureCard
            icon={<MdMarkEmailRead />}
            title="SendGrid"
            desc="Verification & activation emails sent through SendGrid."
          />
          {/* <FeatureCard
            icon={<FaFacebookF />}
            title="Facebook OAuth"
            desc="Sign in with Facebook using Meta for Developers Facebook SDK."
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
