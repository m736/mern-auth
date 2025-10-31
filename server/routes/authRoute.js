import express from "express";
import {
  getUserProfile,
  isAuthenticated,
  login,
  logout,
  register,
  resetPassword,
  sendRestOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controller/authController.js";
import userAuth from "../middleware/userAuth.js";
const authRouter = express.Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);
authRouter.get("/my-profile", userAuth, getUserProfile);
authRouter.get("/send-verify-otp", userAuth, sendVerifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.post("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendRestOtp);
authRouter.post("/reset-password", resetPassword);
export default authRouter;
