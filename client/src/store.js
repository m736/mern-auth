import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
const reducer = combineReducers({
  authState: authReducer,
});

const store = configureStore({
  reducer,
});

export default store;
