import express from "express";
import {
  activateController,
  registerController,
} from "../controllers/auth.controller.js";

import {
  validRegister,
  validLogin,
  validForgotPassword,
  validResetPassword,
} from "../validator/auth.validator.js";

const router = express.Router();

// POST endpoint to register user
router.post("/register", validRegister, registerController);
router.post("/activate", activateController);

export default router;
