import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { restaurantTypesSlice } from './restaurantTypes/restaurantTypesSlice';

// export const store = configureStore({
//     reducer: {
//         authSlice: authSlice.reducer,
//     },
// })

const rootReducer = {
  auth: authSlice.reducer,
  restaurantTypes: restaurantTypesSlice.reducer,
    // ...otros reducers si los tienes
  };
  
  export const store = configureStore({
    reducer: rootReducer,
    // ...otras configuraciones del store si es necesario
  });

  
  
  
  
  
  
  
// export type RootState = returnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;