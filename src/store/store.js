import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import {orderSlice} from './order/orderReducer'


const rootReducer = {
  auth: authSlice.reducer,
  order: orderSlice.reducer
  // ...otros reducers si los tienes
};

export const store = configureStore({
  reducer: rootReducer,
  // ...otras configuraciones del store si es necesario
});
