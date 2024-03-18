/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import instance from "../../api/axios";
import { Collection } from "../../types/ElementTypes";

interface CollectionsState {
  collections: object | null;
  collection: object | null
}

const initialState: CollectionsState = {
  collections: JSON.parse(localStorage.getItem("collections") ?? "null"),
  collection: JSON.parse(localStorage.getItem("collection") ?? "null")
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

const getSingleCollection = createAsyncThunk<Collection, string>("/collection/:id", async(id:string) => {
  try {
    const response: AxiosResponse = await instance(`/collection/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
})

const CollectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCollections.fulfilled, (state, action: PayloadAction<object>) => {
      state.collections = action.payload;
      localStorage.setItem("collections", JSON.stringify(action.payload));
    });
    builder.addCase(getSingleCollection.fulfilled, (state, action: PayloadAction<Collection>) => {
      state.collection = action.payload;
      localStorage.setItem("collection", JSON.stringify(action.payload))
    })
  },
});

export { getCollections, getSingleCollection };
export default CollectionSlice.reducer;
