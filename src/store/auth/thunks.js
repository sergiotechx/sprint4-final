import { collection, doc, setDoc } from "firebase/firestore";
import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithgoogle,
} from "../../firebase/providers";
import { addNewUser, chekingCredentials, loging, logout } from "./authSlice";
import { FirebaseDB } from "@/firebase/config";

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
  photoURL
}) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
      date,
      celphone,
      photoURL
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
      
      dispatch(
        addNewUser({
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
          email: result.email,
        })
      );

      return {
        ok: true,
        displayName: result.displayName,
        date: result.date,
      };
    } else {
      dispatch(logout(result.errorMessage));
      return { ok: false };
    }
  };
};

export const startNewUser = () => {
  return async (dispatch, getState) => {
    
    const State = getState().auth;

    console.log('Current State:', State);

    const newUser = {
      uid: State.uid,
      photoURL: State.photoURL,
      email: State.email,
      displayName: State.displayName,
      date: State.date,
      celphone: State.celphone,

    }
   const newDoc = doc(FirebaseDB, 'Users', State.uid);
   const setDocResp = await setDoc( newDoc, newUser );
   console.log(newDoc, setDocResp);
  };
};

export const starLoadingUser = () =>{
  return async(dispatch) =>{

    const State = getState().auth;

    console.log(State);
    //
  }
}
