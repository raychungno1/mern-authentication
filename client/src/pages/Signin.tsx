import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signin } from "../actions/auth";
import { useAppDispatch } from "../hooks/reduxHooks";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    dispatch(signin(formData, navigate));
  };

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Name *"
        onChange={handleChange}
        autoComplete="email"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password *"
        onChange={handleChange}
        autoComplete="current-password"
        required
      />
      <input className="btn" type="submit" value="Sign In" />
      <Link className="btn-secondary" to="/signup">
        Don't have an account? Sign up
      </Link>
    </form>
  );
};

export default Signin;
