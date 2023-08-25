import { useRouter } from "next/navigation"
import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithgoogle } from "../../firebase/providers"
import { chekingCredentials, loging, logout } from "./authSlice"
import { useCheckAuth } from "@/hooks/useCheckingAuth"




export const checkingAuthetication = ( email, password) =>{
    return async(dispatch) =>{

        dispatch( chekingCredentials() )

    }
}

export const startGoogleSignIn = ( email, password) =>{
    return async(dispatch) =>{

        dispatch( chekingCredentials() );

        const result = await signInWithgoogle()
        if(!result.ok) return dispatch( logout( result.errorMessage) );
       
        dispatch( loging( result ))

    }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {

    return async(dispatch) =>{

        dispatch( chekingCredentials() );
        const result = await registerUserWithEmailPassword({email, password, displayName})

        if(!result.ok ) return dispatch( logout(result.errorMessage) )

        dispatch( loging( result))

    }

}

export const startLoginWithEmailPassword = ({email, password}) =>{
    
    return async(dispatch) =>{

        dispatch( chekingCredentials() );

        const result = await loginWithEmailPassword({email, password} )

        if(!result.ok ) return dispatch( logout(result.errorMessage ) )

        dispatch( loging( result))

        const loginStatus = useCheckAuth()

        console.log(loginStatus);

     
            
           

        

    }
}

