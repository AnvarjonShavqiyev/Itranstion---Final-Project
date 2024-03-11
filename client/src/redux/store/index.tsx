import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../features/authSlice'
import collectionSlice from '../features/collectionSlice'
export const store = configureStore({
    reducer:{
        auth: authSlice,
        collections: collectionSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch