/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import instance from "../../api/axios";

interface ItemsState {
  items: object | null;
  item: object | null;
}


const initialState: ItemsState = {
  items: JSON.parse(localStorage.getItem("items") ?? "null"),
  item: JSON.parse(localStorage.getItem("item") ?? "null"),
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
const getSingleItem = createAsyncThunk<object,any>("/item/id", async (id:any) => {
  try {
    const response: AxiosResponse = await instance(`item/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
});
const doLike = createAsyncThunk<object, { item_id: any, id: any }>(
  'item/like',
  async ({ item_id, id }) => {
    try {
      const response: AxiosResponse = await instance.post(`item/like/${item_id}`, { id: id });
      return response.data.item;
    } catch (error) {
      console.error("Error liking item:", error);
      throw error;
    }
  }
);
const unLike = createAsyncThunk<object, { item_id: any, id: any }>(
  'item/like',
  async ({ item_id, id }) => {
    try {
      const response: AxiosResponse = await instance.post(`item/unlike/${item_id}`, { id: id });
      return response.data.item;
    } catch (error) {
      console.error("Error liking item:", error);
      throw error;
    }
  }
);

const ItemsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(getItems.fulfilled, (state, action: PayloadAction<object>) => {
        state.items = action.payload;
        localStorage.setItem("items", JSON.stringify(action.payload));
      });
      builder.addCase(getSingleItem.fulfilled,(state, action: PayloadAction<object>) => {
        state.item = action.payload;
        localStorage.setItem("item", JSON.stringify(action.payload));        
      })
      builder.addCase(doLike.fulfilled,(state, action: PayloadAction<object>) => {
        state.item = action.payload
        localStorage.setItem("item", JSON.stringify(action.payload));   
      })
      builder.addCase(unLike.fulfilled,(state, action: PayloadAction<object>) => {
        state.item = action.payload
        localStorage.setItem("item", JSON.stringify(action.payload));   
      })
  },
});

export { getItems,getSingleItem,doLike,unLike };
export default ItemsSlice.reducer;
