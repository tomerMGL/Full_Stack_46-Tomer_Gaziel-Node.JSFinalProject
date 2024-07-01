import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentsService from "./departmentsService";
import authService from "../auth/authService";

const initialState = {
  departmentsData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllDepartments = createAsyncThunk(
  "/getAllDepartments",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await departmentsService.getAllDepartments(token);
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

export const createNewDepartment = createAsyncThunk(
  "/createNewDepartment",
  async (newDepartment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await departmentsService.createNewDepartments(
        token,
        newDepartment
      );
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

export const updateDepartment = createAsyncThunk(
  "/updateDepartment",
  async (newDepartment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await departmentsService.updateDepartments(token, newDepartment);
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

export const deleteDepartment = createAsyncThunk(
  "/deleteDepartment",
  async (departmentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await departmentsService.deleteDepartment(token, departmentId);
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
const departmentSlice = createSlice({
  name: "departmentsSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getAllDepartments.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departmentsData = action.payload.data;
      })

      .addCase(getAllDepartments.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(createNewDepartment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createNewDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.departmentsData = action.payload.data;
        state.message = action.payload.message;
      })

      .addCase(createNewDepartment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(updateDepartment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(updateDepartment.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(deleteDepartment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(deleteDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = departmentSlice.actions;
export default departmentSlice.reducer;
