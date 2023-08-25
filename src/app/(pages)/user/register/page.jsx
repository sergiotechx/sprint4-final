'use client'

import React, { useMemo, useState } from "react";
import './register.scss'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useForm } from "@/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "@/store/auth/thunks";


const formData = {
  email: "",
  password: "",
  displayName: ""
}

const formValidations =  {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value) => value.length >= 5, 'El password debe de tener más 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

const Pages = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState( false)

  const { status, errorMessage} = useSelector( state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const {
     displayName, email, password, onInputChange, formState,
     isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm(formData, formValidations);

    

  const onSubmit = ( event) => {
    event.preventDefault()

    setFormSubmitted(true)

    if ( !isFormValid) return;
    dispatch( startCreatingUserWithEmailPassword(formState));
    console.log(formState);
  }
  
  return (
//     <div >
//     <form className=" form" onSubmit={ onSubmit}>
//       <h1>Create account</h1>
//     <div className="mb-3">
//     <label  className="form-label" >Nombre</label>
//     <input 
//       type="text" 
//       className="form-control" 
//       placeholder="Nombre"
//       name="displayName"
//       value={ displayName}
//       onChange={ onInputChange}
//       error
//       />
//       <div class="valid-feedback">
//       Looks good!
//     </div>
//   </div>
  
//   <div className="mb-3">
//     <label  className="form-label" >Email</label>
//     <input 
//       type="email" 
//       className="form-control" 
//       placeholder="Email address"
//       name="email"
//       value={ email}
//       onChange={ onInputChange}
//       />
//   </div>
//   <div className="mb-3">
//     <label  className="form-label" >Password</label>
//     <input 
//       type="password" 
//       className="form-control" 
//       placeholder="Password"
//       name="password"
//       value={ password}
//       onChange={ onInputChange}
//       />
//   </div>
//   <button 
//     type="submit"
//     className="btn btn-primary createB"
//     >Create</button>
  
// </form>
//     </div>

      <form onSubmit={onSubmit}>
          <Grid container>
           
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Nombre completo" 
                type="text" 
                placeholder='Nombre completo' 
                fullWidth
                name="displayName"
                value={ displayName }
                onChange={ onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
               
              /> 
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Correo" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
               
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
                
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid 
                item 
                xs={ 12 }
                display={ !!errorMessage ? '': 'none'}
                >
                <Alert severity='error'>{errorMessage} </Alert>
              </Grid>
              <Grid item xs={ 12 }>
            <Button 
                  disabled={ isCheckingAuthentication }
                  type="submit"
                  variant='contained' 
                  fullWidth>
                  Crear cuenta
                </Button>
                </Grid>
            </Grid>
            
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              {/* <Link component={ RouterLink } color='inherit' to="/auth/login">
                ingresar
              </Link> */}
            </Grid>

          </Grid>


        </form>
        
  );
};
 
export default Pages;
