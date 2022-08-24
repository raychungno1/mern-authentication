import { check } from "express-validator";

export const validRegister = [
  check("name")
    .notEmpty()
    .withMessage("Name is required.")

    .isLength({ min: 2, max: 32 })
    .withMessage("Name must be between 3 to 32 characters."),

  check("email").isEmail().withMessage("Email address invalid."),

  check("password")
    .notEmpty()
    .withMessage("Password is required.")

    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")

    .matches(/\d/)
    .withMessage("Password must contain a number."),
];

export const validLogin = [
  check("email").isEmail().withMessage("Email address invalid."),

  check("password")
    .notEmpty()
    .withMessage("Password is required.")

    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")

    .matches(/\d/)
    .withMessage("Password must contain a number."),
];

export const validForgotPassword = [
  check("email").isEmail().withMessage("Email address invalid."),
];

export const validResetPassword = [
  check("password")
    .notEmpty()
    .withMessage("Password is required.")

    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters.")

    .matches(/\d/)
    .withMessage("Password must contain a number."),
];
