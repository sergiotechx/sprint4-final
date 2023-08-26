import {
  loginWithEmailPassword,
  registerUserWithEmailPassword,
  signInWithgoogle,
} from "../../firebase/providers";
import { chekingCredentials, loging, logout } from "./authSlice";

export const checkingAuthetication = (email, password) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
  };
};

export const startGoogleSignIn = (email, password) => {
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
}) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
    const result = await registerUserWithEmailPassword({
      email,
      password,
      displayName,
    });

    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(loging(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());

    const result = await loginWithEmailPassword({ email, password });

    // if(!result.ok ) return dispatch( logout(result.errorMessage ) )

    // dispatch( loging( result))

    if (result.ok) {
      dispatch(loging(result));
      return { ok: true };
    } else {
      dispatch(logout(result.errorMessage));
      return { ok: false };
    }
  };
};
