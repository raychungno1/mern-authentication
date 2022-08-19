import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  res.status(200).json({ message: "Signing In!" });
};

export const signup = async (req, res) => {
  res.status(200).json({ message: "Signing Up!" });
};
