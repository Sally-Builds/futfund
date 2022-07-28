import { configureStore } from "@reduxjs/toolkit";
import dSlice from "../store/donations/dSlice";
import pSlice from "../store/projects/pSlice";
import authSlice from "../store/auth/authSlice";

export const store = configureStore({
  reducer: {
    pSlice,
    dSlice,
    authSlice,
  },
});

export default store;
