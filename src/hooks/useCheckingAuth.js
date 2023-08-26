// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { onAuthStateChanged } from 'firebase/auth';
// import { FirebaseAuth } from '../firebase/config';
// import { login, logout } from '../store/auth/authSlice';



// export const useCheckAuth = () => {
  
//     const { status } = useSelector( state => state.auth );

//     const dispatch = useDispatch();

//     useEffect(() => {
        
//         onAuthStateChanged( FirebaseAuth, async( user ) => {
//         if ( !user ) return dispatch( logout() );

//         const { uid, email, displayName, photoURL } = user;
//         dispatch( login({ uid, email, displayName, photoURL }) );
//         })
//     }, []);

//     return status;
// }

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';

const CheckAuth = () => {
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FirebaseAuth, async user => {
            if (!user) return dispatch(logout());

            const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
        });

        return () => {
            unsubscribe(); // Limpiar el efecto cuando el componente se desmonta
        };
    }, [dispatch]);

    return status;
};

export default CheckAuth;