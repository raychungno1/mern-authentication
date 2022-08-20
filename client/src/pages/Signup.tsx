import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../actions/auth";
import { useAppDispatch } from "../hooks/reduxHooks";

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

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    dispatch(signup(formData, navigate));
  };

  return (
    <form className="form__container" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <div className="form__2-col">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name *"
            onChange={handleChange}
            autoComplete="given-name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name *"
            onChange={handleChange}
            autoComplete="family-name"
            required
          />
        </div>
      </div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email *"
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
        autoComplete="new-password"
        required
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        type="confirmPassword"
        name="confirmPassword"
        id="confirmPassword"
        placeholder="Confirm Password *"
        onChange={handleChange}
        autoComplete="new-password"
        required
      />
      <input className="btn" type="submit" value="Sign In" />
      <Link className="btn-secondary" to="/signup">
        Don't have an account? Sign up
      </Link>
    </form>
  );
};

export default Signup;
