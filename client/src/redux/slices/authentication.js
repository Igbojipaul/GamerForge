import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://gamerforge.onrender.com/api/auth/signup",
        { name, email, password },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
  
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://gamerforge.onrender.com/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const keepUser = createAsyncThunk("auth/keepUser", async () => {
  try {
    const response = await axios.get(
      "https://gamerforge.onrender.com/api/auth/keepUser",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return error.message || "Something went wrong";
  }
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const response = await axios.post(
      "https://gamerforge.onrender.com/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error || "Something went wrong");
  }
});

const initialState = {
  authenticated: null,
  loading: false,
  user: null,
  error: null,
};

const authentication = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.authenticated = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.authenticated = false;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.authenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.authenticated = false;
    });
    builder.addCase(keepUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(keepUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.message) {
        state.user = action.payload.user;
        state.authenticated = true;
      } else {
        state.user = null;
        state.authenticated = false
      }
    });
    builder.addCase(keepUser.rejected, (state, action) => {
      state.loading = false;
      if (action.payload?.user) {
        state.user = action.payload.user;
        state.authenticated = true;
      } else {
        state.user = null;
        state.authenticated = false;
      }
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.authenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.authenticated = false;
    });
  },
});

export const selectAuthenticated = (state) => state.auth.authenticated;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;

export const { setUser } = authentication.actions;
export default authentication.reducer;
