import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAuthError,
  logout,
  sentVerificationOtp,
} from "../action/UserAction";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { clearSentVerificationOtp } from "../slices/AuthSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, error, sentVerificationOtpSuccess } =
    useSelector((state) => state.authState);
  const logoutHandler = () => {
    dispatch(logout);
  };
  const emailVerifyOtp = () => {
    dispatch(sentVerificationOtp);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (sentVerificationOtpSuccess) {
      toast("Otp Sent Succesfully!", {
        type: "success",
        onOpen: () => dispatch(clearSentVerificationOtp),
      });
      navigate("/email-verify");
      return;
    }
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [
    error,
    isAuthenticated,
    dispatch,
    navigate,
    clearSentVerificationOtp,
    sentVerificationOtpSuccess,
  ]);
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} className="w-28 sm:w-32" />
      {isAuthenticated ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {user?.name[0]}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!user.isAccountVerified && (
                <li
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  onClick={emailVerifyOtp}
                >
                  Verify Email
                </li>
              )}
              <li
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                onClick={logoutHandler}
              >
                LogOut
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 
      rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login
          <img src={assets.arrow_icon} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
