/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import instance from "../../api/axios";


interface CollectionsState {
    collections: object;
}

const initialState: CollectionsState = {
    collections: JSON.parse(localStorage.getItem("collections") ?? "null"),
};

const getCollections = createAsyncThunk<CollectionsState>('/collection', async () => {
    try {
        const response: AxiosResponse = await instance('/collection');
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error to let it propagate and handle it in components if needed
    }
});

const CollectionSlice = createSlice({
    name: "collection",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCollections.fulfilled, (state, action) => {
            console.log(action);
            if (action.payload?.collections) {
                localStorage.setItem("collections", JSON.stringify(action.payload.collections));
                state.collections = action.payload.collections; // Update 'collections' instead of 'user'
                // Note: Avoid redirecting in reducers; handle redirection in components or use middleware
            }
        });
    },
});

// export const { /* your actions */ } = CollectionSlice.actions;
export { getCollections };
export default CollectionSlice.reducer;
