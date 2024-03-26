import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import hotelSlice from "./hotelRedux/hoteSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelSlice.reducer,
  },
});
