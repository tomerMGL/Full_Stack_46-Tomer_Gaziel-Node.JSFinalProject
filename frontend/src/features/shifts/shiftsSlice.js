import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import shiftService from "./shiftsService";
import authService from "../auth/authService";

const initialState = {
  shiftsData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// ALL SHIFTS
export const getAllShifts = createAsyncThunk(
  "/getAllShifts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shiftService.getAllShifts(token);
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

// SHIFT BY ID
export const getShiftById = createAsyncThunk(
  "/getShiftById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shiftService.getShiftById(token, id);
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

// CREATE SHIFT
export const createNewShift = createAsyncThunk(
  "shifts/createNewShift",
  async (newShift, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shiftService.createNewShift(token, newShift);
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

// UPDATE SHIFT
export const updateShift = createAsyncThunk("shifts/updateShift", async (updatedShift, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await shiftService.updateShift(token, updatedShift);
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
})

export const shiftSlice = createSlice({
  name: "shifts",
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
      .addCase(createNewShift.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createNewShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(createNewShift.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
      })

      .addCase(getAllShifts.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllShifts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shiftsData = action.payload.data;
        state.message = action.payload.data.message;
      })

      .addCase(getAllShifts.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        // if (action.payload.status === 401) {
        //   authService.logOut();
        // }
      })

      .addCase(getShiftById.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getShiftById.fulfilled, (state, action) => {
        state.shiftsData = action.payload.data;
        state.isLoading = false;
      })

      .addCase(getShiftById.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })

      .addCase(updateShift.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateShift.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })

      .addCase(updateShift.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
  },
});

export const { reset } = shiftSlice.actions;
export default shiftSlice.reducer;
