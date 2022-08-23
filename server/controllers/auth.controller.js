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

// This route generates a jwt token from the user info
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
  User.findOne({ email }).exec((err, user) => {
    if (user)
      return res.status(400).json({
        error: "Email is taken",
      });
  });

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
