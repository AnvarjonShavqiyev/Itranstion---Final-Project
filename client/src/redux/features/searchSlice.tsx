/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import instance from "../../api/axios";

interface ResultState {
  result: object | null;
}

const initialState: ResultState = {
  result: null
};

const searchByKey = createAsyncThunk<object,string>("/search", async (key:string) => {
  try {
    const response: AxiosResponse = await instance(`item/search/?key=${key}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
});
const searchByTag = createAsyncThunk<object,string>("/search", async (key:string) => {
  try {
    const response: AxiosResponse = await instance(`item/search/?tag=${key}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
});

const searchSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(searchByKey.fulfilled, (state, action: PayloadAction<object>) => {
        state.result = action.payload;
      });
      builder.addCase(searchByTag.fulfilled, (state, action: PayloadAction<object>) => {
        state.result = action.payload;
      });
  },
});

export { searchByKey,searchByTag };
export default searchSlice.reducer;
