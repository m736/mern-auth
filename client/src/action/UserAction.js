import axios from "axios";
import {
  clearError,
  emailVerifyFail,
  emailVerifyRequest,
  emailVerifySuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  sentResetOtpFail,
  sentResetOtpRequest,
  sentResetOtpSuccess,
  sentResetPasswordFail,
  sentResetPasswordRequest,
  sentResetPasswordSuccess,
  sentVerificationOtpFail,
  sentVerificationOtpRequest,
  sentVerificationOtpSuccess,
} from "../slices/AuthSlice";
const backendUrl = import.meta.env.VITE_API_KEY;
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest);
    console.log(backendUrl);
    console.log(`${email}-${password}`);
    const { data } = await axios.post(
      `${backendUrl}/api/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    dispatch(loginSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(loginFail(error.response.data.message));
  }
};
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
  try {
    console.log(userData);

    dispatch(registerRequest());

    const { data } = await axios.post(
      `${backendUrl}/api/auth/register`,
      userData,
      { withCredentials: true }
    );
    dispatch(registerSuccess(data));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(registerFail(error.response.data.message));
  }
};
export const loadUser = async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${backendUrl}/api/auth/my-profile`, {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error.response.data.message));
  }
};
export const logout = async (dispatch) => {
  try {
    console.log("logoutprocess");
    await axios.delete(`${backendUrl}/api/auth/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess());
  } catch (error) {
    console.log(error);
    dispatch(logoutFail(error));
  }
};
export const sentVerificationOtp = async (dispatch) => {
  try {
    dispatch(sentVerificationOtpRequest());

    const { data } = await axios.get(`${backendUrl}/api/auth/send-verify-otp`, {
      withCredentials: true,
    });
    console.log(data);
    dispatch(sentVerificationOtpSuccess(data));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(sentVerificationOtpFail(error.response.data.message));
  }
};
export const sentVerifyEmail = (otp) => async (dispatch) => {
  try {
    dispatch(emailVerifyRequest());
    const { data } = await axios.post(
      `${backendUrl}/api/auth/verify-account`,
      { otp },
      { withCredentials: true }
    );
    dispatch(emailVerifySuccess(data));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(emailVerifyFail(error.response.data.message));
  }
};
export const sentResetOtp = (email) => async (dispatch) => {
  try {
    dispatch(sentResetOtpRequest());
    const { data } = await axios.post(
      `${backendUrl}/api/auth/send-reset-otp`,
      { email },
      { withCredentials: true }
    );
    dispatch(sentResetOtpSuccess(data));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(sentResetOtpFail(error.response.data.message));
  }
};
export const sentResetPassword =
  (email, otp, newPassword) => async (dispatch) => {
    try {
      dispatch(sentResetPasswordRequest());
      const { data } = await axios.post(
        `${backendUrl}/api/auth/reset-password`,
        { email, otp, newPassword },
        { withCredentials: true }
      );

      dispatch(sentResetPasswordSuccess(data));
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(sentResetPasswordFail(error.response.data.message));
    }
  };
