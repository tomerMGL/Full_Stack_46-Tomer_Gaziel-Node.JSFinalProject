import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(sessionStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login
export const authLogin = createAsyncThunk(
  "/users/login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
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

// Log-out
export const authLogOut = createAsyncThunk("/users/logout", () => {
  authService.logOut();
});

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(authLogin.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(authLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data.user;
        state.message = action.payload.message;
      })

      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(authLogOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
