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
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
});
const doLike = createAsyncThunk<object,any>('item/like',async(id:any)=>{
  try {
    const response: AxiosResponse = await instance(`item/like/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    throw error;
  }
})

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
        console.log(action.payload,11)
        localStorage.setItem("item", JSON.stringify(action.payload));        
      })
  },
});

export { getItems,getSingleItem,doLike };
export default ItemsSlice.reducer;
