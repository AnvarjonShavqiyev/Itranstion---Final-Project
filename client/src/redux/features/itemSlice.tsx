/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import instance from "../../api/axios";

interface ItemsState {
  items: object | null;
}


const initialState: ItemsState = {
  items: JSON.parse(localStorage.getItem("items") ?? "null"),
};

const getItems = createAsyncThunk<object>("/item", async () => {
  try {
    const response: AxiosResponse = await instance('/item');
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
});

const ItemsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getItems.fulfilled, (state, action: PayloadAction<object>) => {
        state.items = action.payload;
        localStorage.setItem("item", JSON.stringify(action.payload));
    });
  },
});

export { getItems };
export default ItemsSlice.reducer;
