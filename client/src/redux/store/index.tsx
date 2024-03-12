import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import collectionSlice from '../features/collectionSlice'
import itemSlice from '../features/itemSlice'
export const store = configureStore({
    reducer:{
        auth: authSlice,
        collections: collectionSlice,
        items: itemSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch