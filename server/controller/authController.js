import bycrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwt.js";
// export const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     return res.json({ success: false, message: "Missing Details" });
//   }
//   try {
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "User Already exsisit" });
//     }
//     const hashedPassword = await bycrypt.hash(password, 10);
//     const user = new userModel({ name, email, password: hashedPassword });
//     await user.save();
//     const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: email,
//       subject: "Welcome to My new project",
//       text: `welcome to my website your account has been created with email id :${email}`,
//     };
//     await transporter.sendMail(mailOptions);
//     return res.json({ success: true });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Missing Details", 400));
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User Already exsisit", 400));
  }
  const hashedPassword = await bycrypt.hash(password, 10);
  const user = new userModel({ name, email, password: hashedPassword });
  await user.save();
  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to My new project",
    text: `welcome to my website your account has been created with email id :${email}`,
  };
  await transporter.sendMail(mailOptions);
  return await res.status(201).json({
    success: true,
    token,
    user,
  });
});
export const login = catchAsyncError(async (req, res, next) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Missing Details", 400));
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid Email", 400));
  }
  const isMatch = await bycrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Password", 400));
  }
  const hashedPassword = await bycrypt.hash(password, 10);

  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  // res.cookie("token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  //   maxAge: 7 * 24 * 60 * 60 * 1000,
  // });
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  return res.status(201).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
});
// export const logout = async (req, res, next) => {
//   res
//     .cookie("token", null, {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//     })
//     .status(200)
//     .json({
//       success: true,
//       message: "Loggedout",
//     });
// };
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = catchAsyncError(async (req, res) => {
  const user = await userModel.findById(req.user._id);
  if (user.isAccountVerified) {
    return next(new ErrorHandler("Account already verified", 400));
  }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOtp = otp;
  user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Account Verification OTP",
    text: `Your OTP is ${otp}`,
  };
  await transporter.sendMail(mailOptions);
  return res.status(201).json({
    success: true,
    message: "Verification OTP sent on Email",
  });
});
// export const sendVerifyOtp = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const user = await userModel.findById(userId);
//     if (user.isAccountVerified) {
//       return res.json({ success: false, message: "Account already verified" });
//     }
//     const otp = String(Math.floor(100000 + Math.random() * 900000));
//     user.verifyOtp = otp;
//     user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
//     await user.save();
//     const mailOptions = {
//       from: process.env.SENDER_EMAIL,
//       to: user.email,
//       subject: "Account Verification OTP",
//       text: `Your OTP is ${otp}`,
//     };
//     await transporter.sendMail(mailOptions);
//     return res.json({
//       success: true,
//       message: "Verification OTP sent on Email",
//     });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
export const verifyEmail = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const { otp } = req.body;
  if (!otp) {
    return next(new ErrorHandler("Missing Details", 400));
  }

  // const user = await userModel.findById(_id);
  if (!user) {
    return next(new ErrorHandler("User Not Found", 400));
  }
  if (user.verifyOtp === "" || user.verifyOtp !== otp) {
    return next(new ErrorHandler("Invalid OTP", 400));
  }
  if (user.verifyOtpExpireAt < Date.now()) {
    return next(new ErrorHandler("OTP Expired", 400));
  }
  user.isAccountVerified = true;
  user.verifyOtp = "";
  user.verifyOtpExpireAt = 0;
  await user.save();
  return res
    .status(201)
    .json({ success: true, message: "Email verified Successfully" });
});

export const sendRestOtp = catchAsyncError(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return next(new ErrorHandler("Account already verified", 400));
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Account already verified", 400));
  }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
  await user.save();
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "password reset OTP",
    text: `Your OTP for resetting your password is ${otp}.use this OTP to proceed with resetting your password`,
  };
  await transporter.sendMail(mailOptions);
  return res
    .status(201)
    .json({ success: true, message: "OTP sent to your email" });
});
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return next(new ErrorHandler("Email,OTP and newPassword is required", 400));
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }
  if (user.resetOtp === "" || user.resetOtp !== otp) {
    return next(new ErrorHandler("Invalid OTP", 400));
  }
  if (user.resetOtpExpireAt < Date.now()) {
    return next(new ErrorHandler("OTP Expired", 400));
  }
  const hashedPassword = await bycrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;
  await user.save();

  return res.status(201).json({
    success: true,
    message: "password has been reset successufully",
  });
});

export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
});
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
