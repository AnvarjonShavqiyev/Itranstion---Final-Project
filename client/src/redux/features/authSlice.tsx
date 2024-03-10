/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/ElementTypes";
import { AxiosResponse } from "axios";
import instance from "../../api/axios";
import { toast } from "react-toastify";

interface SignUpResponse {
  token: string;
  user: User;
}

interface AuthState {
  token: string;
  _id: number | null;
  user: User | null;
}

const signup = createAsyncThunk<SignUpResponse, User>(
  "/auth/signup",
  async (data) => {
    try {
      const response: AxiosResponse = await instance.post("/user/signup", data);

      if (response.status === 201) {
        toast.success("Successfully registered :)");
        setTimeout(() => {
          window.location.href = `${window.location.origin}/signIn`;
        }, 2500);
      }

      return response.data as SignUpResponse;
    } catch (error: any) {
      if (error.response && error.response.status === 422) {
        toast.error("Email or Name is already in use!");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong!");
      }
      throw error;
    }
  }
);

const signin = createAsyncThunk<SignUpResponse, User>(
  "/auth/login",
  async (data) => {
    try {
      const response: AxiosResponse = await instance.post("/user/login", data);

      if (response.status === 200) {
        toast.success("Welcome :)");
      }

      return response.data as SignUpResponse;
    } catch (error: any) {
      if (error.response && error.response.status === 500) {
        toast.error("Something went wrong!");
      } else {
        console.error("Unexpected error:", error);
        toast.error("Something went wrong!");
      }
      throw error;
    }
  }
);

const initialState: AuthState = {
  token: sessionStorage.getItem("token") || "",
  _id: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state._id = null;
      state.user = null;
      state.token = "";
      sessionStorage.removeItem("token");
      window.location.href = `${window.location.origin}/signIn`;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.fulfilled, (state, action) => {
      if (action.payload?.token) {
        sessionStorage.setItem("token", action.payload.token);
        state.user = action.payload.user;
      }
    });
  },
});

export const { logOut } = authSlice.actions;
export { signup, signin };
export default authSlice.reducer;