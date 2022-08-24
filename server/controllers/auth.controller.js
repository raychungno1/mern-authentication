import User from "../models/auth.model.js";
import expressJwt from "express-jwt";
import _ from "lodash";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { config } from "dotenv";

// Custom MongoDB error handler to get useful error messages
import { errorHandler } from "../helpers/dbErrorHandling.js";

// Config .env to ./config/config.env
config({
  path: "./config/config.env",
});

// Config Send Grid API
sgMail.setApiKey(process.env.MAIL_KEY);

// Generates a jwt token from the user info
// And sends a verification email to the user
export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: errorMsg,
    });
  }

  // Ensure user doesn't exist
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      error: "Email is taken",
    });
  }

  // Generate token
  const hashedPassword = await User.encryptPassword(password);
  const token = jwt.sign(
    {
      name,
      email,
      password: hashedPassword,
    },
    process.env.JWT_ACCT_ACTV_SECRET,
    {
      expiresIn: "1h",
    }
  );

  // Sending email
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Account Activation Link",
    html: `
      <h1>Welcome, ${name}!</h1>
      <h2>Click this link to activate your account.</h2>
      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
      <hr />
      <p>Your link is active for 1 hour. After that, you will need to resend the verification email.</p>
      <p>This email contains sensitive information.</p>
      <p>${process.env.CLIENT_URL}</p>
    `,
  };

  sgMail
    .send(emailData)
    .then(() => {
      return res.json({
        message: `Email has been sent to ${email}`,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: errorHandler(error),
      });
    });
};

// Verifies a jwt token from the verification email
// And creates an account for the user, sending a JWT token
export const activateController = async (req, res) => {
  const { token: verificationToken } = req.body;

  if (!verificationToken) {
    return res.status(400).json({
      error: "No token provided.",
    });
  }

  try {
    const { name, email, password } = jwt.verify(
      verificationToken,
      process.env.JWT_ACCT_ACTV_SECRET
    );
    console.log("VERIFIED", name, email, password);

    if (name && email && password) {
      // Ensure user doesn't exist
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          error: "Account already activated.",
        });
      }

      const user = await User.create({ name, email, password });

      // Generate token for user session
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_ACCT_ACTV_SECRET,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Signup successful!",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          picture: user.picture,
        },
        token,
      });
    } else {
      return res.status(400).json({
        error: "Invalid token.",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Expired token.",
      });
    }

    return res.status(401).json({
      error: "Invalid token.",
    });
  }
};
