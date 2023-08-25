import {configureStore} from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'

// export const store = configureStore({
//     reducer: {
//         authSlice: authSlice.reducer,
//     },
// })

const rootReducer = {
    auth: authSlice.reducer,
    // ...otros reducers si los tienes
  };
  
  export const store = configureStore({
    reducer: rootReducer,
    // ...otras configuraciones del store si es necesario
  });
  
  
  
  
  
  
  
// export type RootState = returnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;