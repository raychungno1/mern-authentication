import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import {
  Email,
  VerifiedUser,
  Visibility,
  VisibilityOff,
  VpnKey,
} from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { signin } from "../actions/auth";
import { useAppDispatch } from "../hooks/reduxHooks";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AUTH } from "../store/authSlice";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(signin(formData, navigate));
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
        <VerifiedUser fontSize="inherit" htmlColor="white" />
      </div>
      <h2 className="form__title">Sign In</h2>
      <p className="form__subtitle">Login to manage your account</p>
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
          autoFocus
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
          autoComplete="current-password"
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
        <Link className="btn-secondary" to="/signup">
          Don't have an account? Sign up
        </Link>
      </div>
    </form>
  );
};

export default Signin;
