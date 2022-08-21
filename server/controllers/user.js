import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = {
  profile: {
    name: "Test User",
    email: "test@gmail.com",
    id: "987654321",
  },
  token: "sample-JWT-token",
};

export const signin = async (req, res) => {
  res.status(200).json(auth);
  console.log("Signing In!", req.body);
};

export const signup = async (req, res) => {
  res.status(200).json(auth);
  console.log("Signing Up!", req.body);
};
