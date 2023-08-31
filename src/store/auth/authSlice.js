import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
      status: 'not-authenticated', // checking
      userSave: false,
      uid: null,
      email: null,
      displayName: null,
      date: null,
      celphone: null,
      photoURL: null,
      errorMessage: null, 
    },
    reducers: {
        loging: (state,{payload}) =>{
            state.status = 'authenticated', // checking
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.date = payload.date;
            state.celphone = payload.celphone;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        addNewUser:(state,{payload}) =>{
            state.status = 'authenticated', // checking
            state.uid = payload.uid;
            state.userSave= true;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.date = payload.date;
            state.celphone = payload.celphone;
            state.photoURL = payload.photoURL;
        },
        updateUser:(state,{payload}) =>{

        },
        logout: (state,{payload}) =>{
            state.status = 'not-authenticated', // checking
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.date = null;
            state.celphone = null;
            state.errorMessage = payload;
        },
        chekingCredentials: (state) =>{
            state.status = 'checking'
        }
    }
});

export const { loging, logout, chekingCredentials, addNewUser, updateUser } = authSlice.actions;