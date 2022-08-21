import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import {
  AccountCircle,
  AddToQueue,
  Email,
  Visibility,
  VisibilityOff,
  VpnKey,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { signup } from "../actions/auth";
import { useAppDispatch } from "../hooks/reduxHooks";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AUTH } from "../store/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(signup(formData, navigate));
  };

  const signinGoogle = (response: CredentialResponse) => {
    const {
      name,
      email,
      sub: id,
      picture,
    }: {
      name: string;
      email: string;
      sub: string;
      picture: string;
    } = jwt_decode(`${response.credential}`);

    dispatch(
      AUTH({
        profile: { name, email, id, picture },
        token: response.credential,
      })
    );
    navigate("/");
  };

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <div className="form__icon">
        <AddToQueue fontSize="inherit" htmlColor="white" style={{ marginTop: "5"}} />
      </div>
      <h2 className="form__title">Sign Up</h2>
      <p className="form__subtitle">Create an account to get started</p>
      <div className="form__2-col">
        <div className="form__input">
          <TextField
            name="firstName"
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label="First Name"
            type="firstName"
            placeholder="First Name"
            autoFocus
            autoComplete="given-name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="form__input">
          <TextField
            name="lastName"
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label="Last Name"
            type="lastName"
            placeholder="Last Name"
            autoComplete="family-name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="form__input">
        <TextField
          name="email"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="form__input">
        <TextField
          name="password"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          autoComplete="new-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="form__input">
        <TextField
          name="confirmPassword"
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          autoComplete="new-password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    setShowPassword((prevShowPassword) => !prevShowPassword)
                  }
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="form__btn">
        <input className="btn fullwidth" type="submit" value="Sign In" />
      </div>
      <p className="form__subtitle-2">Or Sign In With </p>
      <div style={{ marginBottom: "2rem" }}>
        <GoogleLogin
          onSuccess={signinGoogle}
          onError={() => console.log("Error")}
        />
      </div>
      <div className="form__btn-secondary">
        <Link className="btn-secondary" to="/signin">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
};

export default Signup;
