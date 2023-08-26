import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      status: 'not-authenticated', // checking
      uid: null,
      email: null,
      dispalyName: null,
      photoURL: null,
      errorMessage: null, 
    },
    reducers: {
        loging: (state,{payload}) =>{
            state.status = 'authenticated', // checking
            state.uid = payload.uid;
            state.email = payload.email;
            state.dispalyName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state,{payload}) =>{
            state.status = 'not-authenticated', // checking
            state.uid = null;
            state.email = null;
            state.dispalyName = null;
            state.photoURL = null;
            state.errorMessage = payload;
        },
        chekingCredentials: (state) =>{
            state.status = 'checking'
        }
    }
});

export const { loging, logout, chekingCredentials } = authSlice.actions;