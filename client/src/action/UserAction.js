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
    dispatch(loginFail(error.response.data.message));
  }
};
export const clearAuthError = (dispatch) => {
  dispatch(clearError());
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axios.post(
      `${backendUrl}/api/auth/register`,
      userData,
      { withCredentials: true }
    );
    dispatch(registerSuccess(data));
  } catch (error) {
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
    await axios.delete(`${backendUrl}/api/auth/logout`, {
      withCredentials: true,
    });
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFail(error));
  }
};
export const sentVerificationOtp = async (dispatch) => {
  try {
    dispatch(sentVerificationOtpRequest());

    const { data } = await axios.get(`${backendUrl}/api/auth/send-verify-otp`, {
      withCredentials: true,
    });

    dispatch(sentVerificationOtpSuccess(data));
  } catch (error) {
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
      dispatch(sentResetPasswordFail(error.response.data.message));
    }
  };
