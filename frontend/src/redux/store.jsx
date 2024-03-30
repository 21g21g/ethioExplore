import authReducer from "./features/auth/authSlice";
import hotelSlice from "./hotelRedux/hoteSlice";
import { configureStore } from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelSlice.reducer,
  },
});



