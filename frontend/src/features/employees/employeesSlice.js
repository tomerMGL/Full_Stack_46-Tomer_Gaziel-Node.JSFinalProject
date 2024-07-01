import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeesService from "./emplyeesService";
import authService from "../auth/authService";

const initialState = {
  employeeData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// GET all employees
export const getAllEmployees = createAsyncThunk(
  "/employees",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeesService.getAllEmployees(token);
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

// Create new employee
export const createNewEmployee = createAsyncThunk(
  "/employees/createNew",
  async (newEmployee, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeesService.createNewEmployee(newEmployee, token);
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

// Update Employee
export const updateEmployee = createAsyncThunk(
  "/updateEmployee",
  async (newEmployee, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeesService.updateEmployee(token, newEmployee);
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

// Delete Employee
export const deleteEmployee = createAsyncThunk(
  "/deleteEmployee",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await employeesService.deleteEmployee(token, employeeId);
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

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },

    filterEmployeesByDepartment: (state, action) => {
      if (action.payload !== "")
        state.employeeData = state.employeeData.filter(
          (employee) => employee.departmentId === action.payload
        );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllEmployees.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.employeeData = action.payload.data;
        state.message = action.payload.message;
      })

      .addCase(getAllEmployees.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = (action.payload.message || "Error");
      })

      .addCase(createNewEmployee.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createNewEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(createNewEmployee.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })

      .addCase(updateEmployee.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(updateEmployee.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset, filterEmployeesByDepartment } = employeesSlice.actions;
export default employeesSlice.reducer;
