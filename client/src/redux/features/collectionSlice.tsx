/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import instance from "../../api/axios";

interface CollectionsState {
  collections: object | null;
}

const initialState: CollectionsState = {
  collections: JSON.parse(localStorage.getItem("collections") ?? "null"),
};

const getCollections = createAsyncThunk<object>("/collection", async () => {
  try {
    const response: AxiosResponse = await instance('/collection');
    return response.data.collections;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
});

const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getCollections.fulfilled, (state, action: PayloadAction<object>) => {
        state.collections = action.payload;
        localStorage.setItem("collections", JSON.stringify(action.payload));
    });
  },
});

export { getCollections };
export default CollectionSlice.reducer;
