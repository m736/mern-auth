import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login, register } from "../action/UserAction";
import { toast } from "react-toastify";
import {
  clearLoginRequestCreated,
  clearRegisterRequestCreated,
} from "../slices/AuthSlice";
const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Sign Up");

  const dispatch = useDispatch();
  const {
    loading,
    error,
    isAuthenticated,
    loginSucessfull,
    registerSucessfull,
  } = useSelector((state) => state.authState);
  const [formDatas, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    // Add more form fields here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (state == "Sign Up") {
      const Data = new FormData();
      Data.append("name", formDatas.name);
      Data.append("email", formDatas.email);
      Data.append("password", formDatas.password);
      dispatch(register(Object.fromEntries(Data)));
    } else {
      dispatch(login(formDatas.email, formDatas.password));
    }
  };
  useEffect(() => {
    if (state == "Login" && isAuthenticated) {
      toast("login Succesfully!", {
        type: "success",
        onClose: () => {
          dispatch(clearLoginRequestCreated);
        },
      });
      navigate("/");
      return;
    }
    if (state == "Sign Up" && isAuthenticated) {
      toast("New user Created Succesfully!!", {
        type: "success",
        onClose: () => {
          dispatch(clearRegisterRequestCreated);
        },
      });
      navigate("/");
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
    loginSucessfull,
    registerSucessfull,
    clearAuthError,
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-100">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login to Your account"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create Your Account"
            : "Login to Your account"}
        </p>
        <form onSubmit={submitHandler} className="">
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" className="" />
              <input
                type="text"
                placeholder="Full Name"
                required
                className="bg-transparent outline-none"
                onChange={handleChange}
                name="name"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" className="" />
            <input
              type="text"
              placeholder="Email id"
              required
              className="bg-transparent outline-none"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" className="" />
            <input
              type="text"
              placeholder="Password"
              required
              className="bg-transparent outline-none"
              onChange={handleChange}
              name="password"
            />
          </div>
          <p
            className="mb-4 text-indigo-500 cursor-pointer"
            onClick={() => navigate("/reset-password")}
          >
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white">
            Sign Up
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="tetx-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="tetx-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
