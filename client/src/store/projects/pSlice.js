import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contract from "../../services/contractService";

/**
 * This is the state
 */
const initialState = {
  projects: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

/**
 * Asynchronous functions
 *
 */
export const getProjects = createAsyncThunk(
  "pSlice/getProjects",
  async (data, thunkAPI) => {
    try {
      const projects = await contract.getProjects();
      return projects;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProject = createAsyncThunk(
  "pSlice/createProject",
  async (data, thunkAPI) => {
    try {
      console.log("enterd?");
      const projects = await contract.createProject(data);
      return projects;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const pSlice = createSlice({
  name: "pSlice",
  initialState,
  reducers: {
    updateProjects(state, action) {
      let projects = action.payload.map((el) => {
        return {
          ...el,
          realizeAmt: contract.web3.utils.fromWei(el.realizeAmt, "ether"),
        };
      });
      state.projects = projects;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "successfully created";
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { updateProjects } = pSlice.actions;

/**
 * getters
 */
export const projects = (state) => state.projects;

export const upcomingProjects = (state) => {
  const projects = state.pSlice.projects;
  let upcoming = [];
  if (projects.length > 0) {
    projects.forEach((e) => {
      if (new Date() < new Date(e.startDate * 1000)) {
        let x = { ...e };
        const startDate = new Date(e.startDate * 1000);
        const formatedDate = `${startDate.toLocaleString("default", {
          day: "2-digit",
        })} - ${startDate.toLocaleString("default", {
          month: "long",
        })} - ${startDate.toLocaleString("default", { year: "numeric" })}`;
        const endDate = new Date(e.endDate * 1000);
        const formatedEndDate = `${endDate.toLocaleString("default", {
          day: "2-digit",
        })} - ${endDate.toLocaleString("default", {
          month: "long",
        })} - ${endDate.toLocaleString("default", { year: "numeric" })}`;
        x.startDate = formatedDate;
        x.endDate = formatedEndDate;
        upcoming.push(x);
      }
    });
  }
  // console.log(new Date(projects[0].endDate * 1000).getDate());
  return upcoming;
};

export default pSlice.reducer;
