import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'



const rootReducer = {
    auth: authSlice.reducer,
    // ...otros reducers si los tienes
  };
  
  export const store = configureStore({
    reducer: rootReducer,
    // ...otras configuraciones del store si es necesario
  });
  
  
  
  
  
  
 