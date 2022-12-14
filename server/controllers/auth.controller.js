import User from "../models/auth.model.js";
import expressJwt from "express-jwt";
import { OAuth2Client } from "google-auth-library";
import fetch from "node-fetch";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import { config } from "dotenv";
import axios from "axios";

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
      error: "Email is taken.",
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
      <p>${process.env.CLIENT_URL}/user/activate/${token}</p>
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
        message: `Email has been sent to ${email}.`,
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
      error: "Empty link. Signup again.",
    });
  }

  try {
    const { name, email, password } = jwt.verify(
      verificationToken,
      process.env.JWT_ACCT_ACTV_SECRET
    );

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
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Signup successful!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          picture: user.picture,
        },
        token,
      });
    } else {
      return res.status(400).json({
        error: "Invalid link. Signup again.",
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Expired link. Signup again.",
      });
    }

    return res.status(401).json({
      error: "Invalid link. Signup again.",
    });
  }
};

// Verifies the user's credentials
// Then generates a jwt token to begin a user session
export const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: errorMsg,
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist." });
    }

    const passwordCorrect = await existingUser.authenticate(password);

    if (!passwordCorrect) {
      return res
        .status(400)
        .json({ error: "Email and password do not match." });
    }

    // Generate token for user session
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        picture: existingUser.picture,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// Generates a jwt token for password reset
// And sends a password reset email to the user
export const forgetController = async (req, res) => {
  const { email } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: errorMsg,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User with this email does not exist." });
    }

    // Generate token for password reset
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_RESET_PW,
      {
        expiresIn: "10m",
      }
    );

    // Sending email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset Link",
      html: `
      <h1>Hi, ${user.name}</h1>
      <h2>Click this link to reset your password.</h2>
      <p>${process.env.CLIENT_URL}/user/password/reset/${token}</p>
      <hr />
      <p>Your link is active for 10 minutes. After that, you will need to resend the another email.</p>
      <p>This email contains sensitive information.</p>
      <p>${process.env.CLIENT_URL}</p>
    `,
    };

    await user.updateOne({ resetPasswordLink: token });

    sgMail
      .send(emailData)
      .then(() => {
        return res.json({
          message: `Email has been sent to ${email}.`,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

// Verifies a jwt token from the password reset email
// And updates the password for the user
export const resetController = async (req, res) => {
  const { token: resetPasswordLink, password: newPassword } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: errorMsg,
    });
  }

  try {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PW);
    console.log(resetPasswordLink);
    const user = await User.findOne({ resetPasswordLink });
    if (!user) {
      return res.status(400).json({
        error: "Something went wrong. Request again.",
      });
    }

    const passwordSame = await user.authenticate(newPassword);
    if (passwordSame) {
      return res.status(400).json({ error: "Cannot use previous password." });
    }

    try {
      user.password = await User.encryptPassword(newPassword);
      user.resetPasswordLink = "";
      await user.save();
      return res.status(200).json({ message: "Password reset successful." });
    } catch (error) {
      return res.status(400).json({
        error: "Error reseting user password.",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Expired link. Request again.",
      });
    }

    return res.status(401).json({
      error: "Invalid link. Request again.",
    });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
export const googleController = async (req, res) => {
  const { credential } = req.body;

  try {
    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT,
    });

    const { email, name, picture, email_verified } = ticket.getPayload();

    if (!email_verified) {
      return res.status(401).json({
        error: "Email not verified.",
      });
    }

    let user = await User.findOne({ email });

    // If user does not exist, create account
    if (!user) {
      const password = await User.encryptPassword(
        process.env.JWT_SECRET + email
      );
      user = await User.create({ name, email, password, picture });
    }

    // Generate token for user session
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Google login failed.",
    });
  }
};

export const facebookController = async (req, res) => {
  const { userID, accessToken } = req.body;

  try {
    const url = `https://graph.facebook.com/v14.0/${userID}?fields=id,name,email,picture&access_token=${accessToken}`;
    const { data } = await axios.get(url);
    const {
      name,
      email,
      picture: {
        data: { url: picture },
      },
    } = data;

    let user = await User.findOne({ email });

    // If user does not exist, create account
    if (!user) {
      const password = await User.encryptPassword(
        process.env.JWT_SECRET + email
      );
      user = await User.create({ name, email, password, picture });
    }

    // Generate token for user session
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      error: "Facebook login failed.",
    });
  }
};

export const updateController = async (req, res) => {
  const { userId } = req;
  const { name: newName } = req.body;

  // Validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      error: errorMsg,
    });
  }

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({
        error: "Something went wrong.",
      });
    }

    if (user.name === newName) {
      return res.status(400).json({ error: "Fields not changed." });
    }

    user.name = newName;
    await user.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully.", user });
  } catch (error) {
    return res.status(401).json({
      error: "Error updating profile.",
    });
  }
};
