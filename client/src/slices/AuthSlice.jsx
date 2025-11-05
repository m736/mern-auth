import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    isAuthenticated: false,
    loginSucessfull: false,
    registerSucessfull: false,
    isEmailverify: false,
    sentVerificationOtpSuccess: false,
    isEmailSent: false,
    newPasswordReset: false,
    sentOtp: false,
  },
  reducers: {
    loadUserRequest(state, action) {
      return {
        ...state,
        isAuthenticated: false,
        loading: true,
      };
    },

    loadUserSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
      };
    },
    loadUserFail(state, action) {
      return {
        ...state,
        loading: false,
      };
    },
    loginRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    loginSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        loginSucessfull: true,
        user: action.payload.user,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearLoginRequestCreated(state, action) {
      return {
        ...state,
        loginSucessfull: false,
      };
    },
    clearError(state, action) {
      return {
        ...state,
        error: null,
      };
    },
    registerRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    registerSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: true,
        registerSucessfull: true,
        user: action.payload.user,
      };
    },
    registerFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearRegisterRequestCreated(state, action) {
      return {
        ...state,
        registerSucessfull: false,
      };
    },
    sentVerificationOtpRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    sentVerificationOtpSuccess(state, action) {
      return {
        ...state,
        loading: false,
        sentVerificationOtpSuccess: true,
      };
    },

    sentVerificationOtpFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearSentVerificationOtp(state, action) {
      return {
        ...state,
        sentVerificationOtpSuccess: false,
      };
    },
    emailVerifyRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    emailVerifySuccess(state, action) {
      return {
        ...state,
        loading: false,
        isEmailverify: true,
      };
    },
    emailVerifyFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    sentResetOtpRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    sentResetOtpSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isEmailSent: true,
      };
    },
    sentResetOtpFail(state, action) {
      return {
        ...state,
        loading: false,
        isEmailSent: false,
        error: action.payload,
      };
    },
    sentResetPasswordRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    sentResetPasswordSuccess(state, action) {
      return {
        ...state,
        loading: false,
        newPasswordReset: true,
      };
    },
    sentResetPasswordFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    logoutSuccess(state, action) {
      return {
        loading: false,
        isAuthenticated: false,
      };
    },
    logoutFail(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
  },
});
const { actions, reducer } = authSlice;
export const {
  loginRequest,
  loginSuccess,
  loginFail,
  registerSuccess,
  registerRequest,
  registerFail,
  logoutSuccess,
  logoutFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  clearError,
  sentVerificationOtpRequest,
  sentVerificationOtpSuccess,
  sentVerificationOtpFail,
  emailVerifyRequest,
  emailVerifySuccess,
  emailVerifyFail,
  sentResetOtpRequest,
  sentResetOtpSuccess,
  sentResetOtpFail,
  sentResetPasswordRequest,
  sentResetPasswordSuccess,
  sentResetPasswordFail,
  clearLoginRequestCreated,
  clearRegisterRequestCreated,
  clearSentVerificationOtp,
} = actions;
export default reducer;
