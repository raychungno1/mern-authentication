import express from "express";
import {
  activateController,
  facebookController,
  forgetController,
  googleController,
  loginController,
  registerController,
  resetController,
  updateController,
} from "../controllers/auth.controller.js";

import {
  validRegister,
  validLogin,
  validForgotPassword,
  validResetPassword,
  validUpdate,
} from "../validator/auth.validator.js";
import requireAuth from "../validator/requireAuth.js";

const router = express.Router();

router.post("/register", validRegister, registerController);
router.post("/activate", activateController);

router.post("/login", validLogin, loginController);
router.put("/password/forget", validForgotPassword, forgetController);
router.put("/password/reset", validResetPassword, resetController);

router.post("/googlelogin", googleController);
router.post("/facebooklogin", facebookController);

router.put("/update", [validUpdate, requireAuth], updateController);

export default router;
