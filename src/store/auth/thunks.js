// import {
//   loginWithEmailPassword,
//   registerUserWithEmailPassword,
//   signInWithgoogle,
// } from "../../firebase/providers";
// import { chekingCredentials, loging, logout } from "./authSlice";

// export const checkingAuthetication = (email, password, date, celphone) => {
//   return async (dispatch) => {
//     dispatch(chekingCredentials());
//   };
// };

// export const startGoogleSignIn = (email, password) => {
//   return async (dispatch) => {
//     dispatch(chekingCredentials());

//     const result = await signInWithgoogle();
//     if (!result.ok) return dispatch(logout(result.errorMessage));

//     dispatch(loging(result));
//   };
// };

// export const startCreatingUserWithEmailPassword = ({
//   email,
//   password,
//   displayName,
//   date,
//   celphone,
// }) => {
//   return async (dispatch) => {
//     dispatch(chekingCredentials());
//     const result = await registerUserWithEmailPassword({
//       email,
//       password,
//       displayName,
//       date,
//       celphone,
//     });

//     if (!result.ok) return dispatch(logout(result.errorMessage));

//     dispatch(loging({
//         ok: true,
//         uid, photoURL, email, displayName, date, celphone
//       }));
//   };
// };

// export const startLoginWithGoogle = ({ email, displayName }) => {
//     return async (dispatch) => {
//       dispatch(chekingCredentials());
  
//       const result = await signInWithgoogle({ email, displayName });
  
//       if (result.ok) {
//         dispatch(loging(result));
//         return { ok: true };
//       } else {
//         dispatch(logout(result.errorMessage));
//         return { ok: false };
//       }
//     };
//   };

// export const startLoginWithEmailPassword = ({ email, password }) => {
//   return async (dispatch) => {
//     dispatch(chekingCredentials());

//     const result = await loginWithEmailPassword({ email, password });

//     if (result.ok) {

    
//     dispatch(loging({
//         ok: true,
//         uid, photoURL, displayName, date, celphone
//       }));
//       return { ok: true };
//     } else {
//       dispatch(logout(result.errorMessage));
//       return { ok: false };
//     }
//   };
// };


import {
    loginWithEmailPassword,
    registerUserWithEmailPassword,
    signInWithgoogle,
  } from "../../firebase/providers";
  import { chekingCredentials, loging, logout } from "./authSlice";
  
  export const checkingAuthetication = (email, password, date, celphone) => {
    return async (dispatch) => {
      dispatch(chekingCredentials());
    };
  };
  
  export const startGoogleSignIn = () => {
    return async (dispatch) => {
      dispatch(chekingCredentials());
  
      const result = await signInWithgoogle();
      if (!result.ok) return dispatch(logout(result.errorMessage));
  
      dispatch(loging(result));
    };
  };
  
  export const startCreatingUserWithEmailPassword = ({
    email,
    password,
    displayName,
    date,
    celphone,
  }) => {
    return async (dispatch) => {
      dispatch(chekingCredentials());
      const result = await registerUserWithEmailPassword({
        email,
        password,
        displayName,
        date,
        celphone,
      });
  
      if (!result.ok) return dispatch(logout(result.errorMessage));
  
      if (result.ok) {
        dispatch(
          loging({
            ok: true,
            uid: result.uid,
            photoURL: result.photoURL,
            email: result.email,
            displayName: result.displayName,
            date: result.date,
            celphone: result.celphone,
          })
        );
      }
    };
  };
  
  export const startLoginWithGoogle = () => {
    return async (dispatch) => {
      dispatch(chekingCredentials());
  
      const result = await signInWithgoogle();
    
      if (result.ok) {
        dispatch(
          loging({
            ok: true,
            uid: result.uid,
            photoURL: result.photoURL,
            email: result.email,
            displayName: result.displayName,
          })
        );
        return { ok: true };
      } else {
        dispatch(logout(result.errorMessage));
        return { ok: false };
      }
    };
  };
  
  export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
      dispatch(chekingCredentials());
  
      const result = await loginWithEmailPassword({ email, password });
  
      if (result.ok) {
        dispatch(
          loging({
            ok: true,
            uid: result.uid,
            photoURL: result.photoURL,
            displayName: result.displayName,
            date: result.date,
            celphone: result.celphone,
          })
        );
        
        return {
             ok: true,
             displayName: result.displayName,
            date: result.date
         };
      } else {
        dispatch(logout(result.errorMessage));
        return { ok: false };
      }
    };
  };