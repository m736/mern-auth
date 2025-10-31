import JWT from "jsonwebtoken";
import catchAsyncError from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import userModel from "../models/userModel.js";
// const userAuth = catchAsyncError(async (req, res, next) => {
//   const { token } = req.cookies;
//   console.log(token);
//   if (!token) {
//     return next(new ErrorHandler("Login first to handle this resource", 401));
//   }

//   const tokenDecode = JWT.verify(token, process.env.JWT_SECRET);
//   if (tokenDecode.id) {
//     req.user = await userModel.findById(tokenDecode.id);
//   } else {
//     return next(new ErrorHandler("Login first to handle this resource", 401));
//   }
//   next();
// });
const userAuth = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to handle this resource", 401));
  }

  const decoded = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decoded.id);
  next();
});
export default userAuth;
