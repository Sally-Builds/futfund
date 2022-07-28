import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contract from "../../services/contractService";

/**
 * store
 */

const initialState = {};

// const adminSlice = createSlice({
//   name: "adminSlice",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isError = false;
//       state.isLoading = false;
//       state.isSuccess = false;
//       state.message = "";
//     },
//   },
//   extraReducers: (builder) => {
//     // builder.addCase(requestWallet.pending, (state) => {
//     //   state.isLoading = true;
//     //   state.message = "";
//     // });
//   },
// });
