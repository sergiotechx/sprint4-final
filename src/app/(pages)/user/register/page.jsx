"use client";

import React, { useMemo, useState } from "react";
import "./register.scss";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "@/hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  startCreatingUserWithEmailPassword,
  startNewUSer,
  startNewUser,
} from "@/store/auth/thunks";
import { store } from "@/store/store";
import fileUpload from "@/services/fileUpload";
import Swal from "sweetalert2";

const formData = {
  email: "",
  password: "",
  displayName: "",
  date: "",
  celphone: "",
  photoURL: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener una @"],
  password: [
    (value) => value.length >= 5,
    "El password debe de tener más 6 letras",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

const Pages = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const {
    displayName,
    email,
    password,
    date,
    photoURL,
    celphone,
    onInputChange,
    formState,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No se ha seleccionado ningún archivo.");
      return;
    }

    const avatar = await fileUpload(selectedFile);
    const createUser = {
      ...formState,
      photoURL: avatar,
    };

    console.log("createUser:", createUser);

    setFormSubmitted(true);

    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  const handleClik = () => {
    router.push("login");
  };

  const onClickNewUser = async () => {
    await dispatch(startCreatingUserWithEmailPassword(formState));
    await new Promise((resolve) => setTimeout(resolve, 0));
    const avatar = await fileUpload(selectedFile);
    const updatedCreateUser = {
      ...formState,
      photoURL: avatar,
    };

    dispatch(startNewUser(updatedCreateUser));

    Swal.fire("Bien hecho", "Cuenta creada exitosamente", "success");

    await new Promise((resolve) => setTimeout(resolve, 0));
    const currentState = store.getState().auth;
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Nombre completo"
            type="text"
            placeholder="Nombre completo"
            fullWidth
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            error={!!displayNameValid && formSubmitted}
            helperText={displayNameValid}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Correo"
            type="email"
            placeholder="correo@google.com"
            fullWidth
            name="email"
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={emailValid}
          />
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Contraseña"
            type="password"
            placeholder="Contraseña"
            fullWidth
            name="password"
            value={password}
            onChange={onInputChange}
            error={!!passwordValid && formSubmitted}
            helperText={passwordValid}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="Fecha de nacimiento"
            type="text"
            placeholder="Escriba su fecha de nacimiento seprada por -"
            fullWidth
            name="date"
            value={date}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            label="numero de telefono"
            type="number"
            placeholder="digite su numero de telefono"
            fullWidth
            name="celphone"
            value={celphone}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <TextField
            type="file"
            fullWidth
            name="photoURL"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage} </Alert>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={onClickNewUser}
              disabled={isCheckingAuthentication}
              className="crear"
              type="submit"
              variant="contained"
              fullWidth
            >
              Crear cuenta
            </Button>
          </Grid>
        </Grid>

        <Grid
          className="redireccion"
          container
          direction="row"
          justifyContent="end"
        >
          <div>
          <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
          <span className="redireccion__link" onClick={handleClik}>
            Ingresar
          </span>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default Pages;
