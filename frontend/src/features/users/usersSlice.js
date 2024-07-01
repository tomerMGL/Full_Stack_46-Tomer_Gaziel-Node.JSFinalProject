import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";
import authService from "../auth/authService";

const initialState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "/users",
  async (token, thunkAPI) => {
    try {
      return await usersService.getAllUsers(token);
    } catch (err) {
      console.log(err);
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

export const usersSlice = createSlice({
  name: "users",
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
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.users = action.payload.data;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        state.users = null;
        if (action.payload.status === 401) {
          authService.logOut();
        }
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
