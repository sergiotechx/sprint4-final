import { collection, doc, setDoc } from "firebase/firestore";
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithgoogle,
} from "../../firebase/providers";
import { addNewUser, chekingCredentials, loging, logout, updateUser } from "./authSlice";
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
      photoURL,
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

export const startNewUser = (createUser) => {
  return async (dispatch, getState) => {
    
    const State = getState().auth;

    const newUser = {
      uid: State.uid,
      photoURL: createUser?.photoURL,
      email: State.email,
      displayName: State.displayName,
      date: State.date,
      celphone: State.celphone,
      CreditCard: "",
      Paypal: "",

    }
   const newDoc = doc(FirebaseDB, 'Users', State.uid);
   await setDoc( newDoc, newUser );
  };
};

export const starLoadingUser = () =>{
  return async(dispatch) =>{

    const State = getState().auth;

    //
  }
}
export const startUpdatingUser = (updatedUserData) => {
  return async (dispatch, getState) => {
    try {
      
      const State = getState().auth;
      const updateDoc = doc(FirebaseDB, 'Users', State.uid);

      const updatedData = {
        displayName: updatedUserData.displayName,
        celphone: updatedUserData.celphone,
        date: updatedUserData.date,
      };

      
      
      await setDoc(updateDoc, updatedData, { merge: true });
      
      dispatch(updateUser(updatedData));

      
      

    } catch (error) {
      
    }
  };
  };
  export const startUpdatingPayment = (updatedPaymentData) => {
    return async (dispatch, getState) => {
      try {
        
        const State = getState().auth;
        const updateDoc = doc(FirebaseDB, 'Users', State.uid);
  
        const updatedDataPay = {
          CreditCard: updatedPaymentData.CreditCard,
          Paypal: updatedPaymentData.Paypal,
        };
  
        
        
        await setDoc(updateDoc, updatedDataPay, { merge: true });
        
        dispatch(updatePayment(updatedDataPay));
  
        
        
  
      } catch (error) {
        
      }
    };
    };

    export const starLogout = () => {
      return async( dispatch) => {
        await logoutFirebase()

        dispatch( logout() );
      }
    }