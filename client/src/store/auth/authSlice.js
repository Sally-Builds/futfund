import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contract from "../../services/contractService";

/**
 * This is the state
 */
const initialState = {
  isLoggedIn: false,
  adminAddress: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  balance: 0,
};

/**
 * Asynchronous functions
 *
 */

export const requestWallet = createAsyncThunk(
  "authSlice/requestWallet",
  async (data, thunkAPI) => {
    try {
      await contract.requestWallet();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const isConnected = createAsyncThunk(
  "authSlice/isConnected",
  async (data, thunkAPI) => {
    try {
      return await contract.isConnected();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAdminAddress = createAsyncThunk(
  "authSlice/adminAddress",
  async (data, thunkAPI) => {
    try {
      return await contract.getAdminAddress();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestWallet.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(requestWallet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Connected Successfully";
        state.isLoggedIn = true;
      })
      .addCase(requestWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Something went wrong";
      })
      //isConnected builder
      .addCase(isConnected.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
      })
      .addCase(isConnected.rejected, (state) => {
        state.isLoggedIn = false;
      })
      //adminAddress builder
      .addCase(getAdminAddress.fulfilled, (state, action) => {
        state.adminAddress = action.payload;
      })
      .addCase(getAdminAddress.rejected, (state) => {
        state.adminAddress = false;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
