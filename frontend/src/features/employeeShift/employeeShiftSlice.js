import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeShiftService from "./employeeShiftService";

const initialState = {
  relationsData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new relation
export const createNewRelation = createAsyncThunk(
  "/createNewRelation",
  async (newRelation, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await employeeShiftService.createNewRelation(token, newRelation);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString;
      return thunkAPI.rejectWithValue({
        message: msg,
        status: err.response.status,
      });
    }
  }
);

// Get All Employees By Shift Id
export const getAllEmployeesByShiftId = createAsyncThunk(
  "/getAllEm[ployeesByShiftId",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return employeeShiftService.getRelationsByShiftId(token, id);
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString;
      return thunkAPI.rejectWithValue({
        message: msg,
        status: err.response.status,
      });
    }
  }
);

// Delete Relation
export const deleteRelation = createAsyncThunk(
  "/deleteRelation",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const status = await employeeShiftService.deleteRelation(
        token,
        employeeId
      );
      return status;
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString;
      return thunkAPI.rejectWithValue({
        message: msg,
        status: err.response.status,
      });
    }
  }
);

// Get All Shifts By Employee Id
export const getAllShiftsByEmployeeId = createAsyncThunk(
  "/getAllShiftsByEmployeeId",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.tokne;
      const status = await employeeShiftService.getRelationsByEmployeeId(
        token,
        employeeId
      );
      return status;
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString;
      return thunkAPI.rejectWithValue({
        message: msg,
        status: err.response.status,
      });
    }
  }
);
export const employeeShiftSlice = createSlice({
  name: "employeeShiftSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.relationsData = [];
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(createNewRelation.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createNewRelation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(createNewRelation.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })

      .addCase(getAllEmployeesByShiftId.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllEmployeesByShiftId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.relationsData = action.payload.data;
      })

      .addCase(getAllEmployeesByShiftId.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
      })

      .addCase(deleteRelation.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteRelation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(deleteRelation.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(getAllShiftsByEmployeeId.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllShiftsByEmployeeId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.relationsData = action.payload.data;
        // state.message = action.payload.message;
      })

      .addCase(getAllShiftsByEmployeeId.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = employeeShiftSlice.actions;
export default employeeShiftSlice.reducer;
