import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import { loadUser } from "./action/UserAction";
import store from "./store";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="email-verify" element={<EmailVerify />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
