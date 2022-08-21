# MERN Authentication

This repository serves as a template authentication flow implementation using the MERN stack.

It also includes instructions on how to create this workflow.

The project is current still work-in-progress.

---

## Features

---

## Todo

---

## Instructions

1. [General Setup](./instructions/1-setup.md)
2. [MongoDB Setup](./instructions/2-mongodb.md)
3. [Google OAuth Setup](./instructions/3-google-oauth.md)
4. Backend Infrastructure
   - [Backend Setup](./instructions/4a-backend.md)
   - [Backend Models](./instructions/4b-backend-models.md)
   - [Backend Controllers](./instructions/4c-backend-controllers.md)
   - [Backend Routes](./instructions/4d-backend-routes.md)
5. Frontend Infrastructure
   - [Redux Setup](./instructions/5a-redux.md)
   - [API Calls](./instructions/5b-api.md)
   - [Actions](./instructions/5c-actions.md)
   - [User Interface](./instructions/5d-ui.md)
6. [Backend Signin & Signup](./instructions/6-backend-controllers-2.md)

```js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User doesn't exist." });

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign({ email: user.email, id: user._id }, "secret", {
      expiresIn: "1h",
    });

    const { _id: userId, email: userEmail, name: userName } = user;
    res.status(200).json({
      profile: { id: userId, email: userEmail, name: userName },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email: email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const { _id: newId, email: newEmail, name: newName } = result;

    const token = jwt.sign({ email: newEmail, id: newId }, "secret", {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ profile: { id: newId, email: newEmail, name: newName }, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
```
