import {signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider()

export const signInWithgoogle = async() =>{
    try {
        
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        // const credentials = GoogleAuthProvider.credentialFromResult( result);

        const {displayName, email, photoURL, uid} = result.user
        
        return{
            ok: true,
            // User info
            displayName, email, photoURL, uid
        }
        

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName, date, celphone}) => {
    try {
        
       const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const {uid, photoURL} = resp.user;
       //TODO: actualizar el displayName en Firebase
       await updateProfile( FirebaseAuth.currentUser,{ displayName });

       return {
        ok: true,
        uid, photoURL, email, displayName,  date, celphone
       }


    } catch (error) {
       
        return{
            ok: false,
            errorMessage: 'Usuario existente'
        }
    }
}

export const loginWithEmailPassword = async ({email, password} ) =>{
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password)
        const {uid, photoURL, displayName, date, celphone } = resp.user;

        return{
            ok: true,
            uid, photoURL, displayName,date, celphone
        }

    } catch (error) {
        return{
            ok: false,
            errorMessage: error.message
        }
    }


}