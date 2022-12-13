import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contract from "../../services/contractService";

/**
 * This is the state
 */
const initialState = {
  myDonations: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * Asynchronous functions
 *
 */
export const createDonation = createAsyncThunk(
  "dSlice/createDonation",
  async (data, thunkAPI) => {
    try {
      const donation = await contract.createDonation(data.index, data.value);
      return donation;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDonations = createAsyncThunk(
  "dSlice/getDonations",
  async (data, thunkAPI) => {
    try {
      const donations = await contract.getMyDonations();
      return donations;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const dSlice = createSlice({
  name: "dSlice",
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
      .addCase(createDonation.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(createDonation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "successfully created";
      })
      .addCase(createDonation.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // getMy Donations
      .addCase(getDonations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDonations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myDonations = action.payload;
      })
      .addCase(getDonations.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

/**
 * getters
 */
export const projects = (state) => state.myDonations;

export const { reset } = dSlice.actions;

export default dSlice.reducer;
