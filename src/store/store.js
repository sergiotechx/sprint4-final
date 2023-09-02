import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { restaurantTypesSlice } from "./restaurantTypes/restaurantTypesSlice";
import { restaurantsSlice } from "./restaurants/restaurantsSlice";

const rootReducer = {
  auth: authSlice.reducer,
  restaurantTypes: restaurantTypesSlice.reducer,
  restaurants: restaurantsSlice.reducer,
  // ...otros reducers si los tienes
};

export const store = configureStore({
  reducer: rootReducer,
  // ...otras configuraciones del store si es necesario
  devTool: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
