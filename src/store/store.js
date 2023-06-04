import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { hotelSlice } from './hotel';
export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        hotel: hotelSlice.reducer
    }
})