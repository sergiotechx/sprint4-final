import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import {orderSlice} from './order/orderReducer'
import{restaurantTypesSlice} from './restaurantTypes/restaurantTypesSlice'
import {restaurantsSlice} from './restaurants/restaurantsSlice'
import thunk from "redux-thunk";


const rootReducer = {
  auth: authSlice.reducer,
  order: orderSlice.reducer,
  restaurantTypes:restaurantTypesSlice.reducer,
  restaurants:restaurantsSlice.reducer
  // ...otros reducers si los tienes
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk] 
  // ...otras configuraciones del store si es necesario
});
