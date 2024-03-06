import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/authSlice'
import favReducer from './features/favSlice'

export const store = configureStore({
    reducer:{
        auth: authReducer,
        favorites: favReducer,
    }
})