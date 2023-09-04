"use client";

import "./login.scss";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  startLoginWithEmailPassword,
  startGoogleSignIn,
} from "@/store/auth/thunks";
import { useForm } from "@/hooks/useForm";
import { chekingCredentials } from "@/store/auth/authSlice";
import "bootstrap-icons/font/bootstrap-icons.css";

const Page = () => {
  const { status } = useSelector((state) => state.auth);
 
  const router = useRouter();
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const isAuthenticating = useMemo(() => status === "checking", [status]);
  const isLogin = useMemo(() => status === "authenticated", [status]);

  const onSubmit = async (event) => {
    event.preventDefault();
    dispatch(chekingCredentials());
    const result = await dispatch(
      startLoginWithEmailPassword({ email, password })
    );
    if (result && result.ok) {
      router.push("/");
    }
  };

  if (isLogin) {
    router.push("/");
  }

  const onGoogleSignIn = () => {
    dispatch(chekingCredentials());
    dispatch(startGoogleSignIn());
  };

  if (isLogin) {
    router.push("/");
  }
  const handleClik = () => {
    router.push(`register`);
  };

  return (
    <div className="LoginP">
      <form className=" form" onSubmit={onSubmit}>
        <h1>Inicio de sesion</h1>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={onInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        </div>
        <div className="loginButon">
          <button disabled={isAuthenticating} type="submit" className="login">
            Login
          </button>
          <button
            disabled={isAuthenticating}
            className="buttons__Goo"
            type="button"
            onClick={onGoogleSignIn}
          >
            <i className="bi bi-google"></i>
            Google
          </button>
        </div>
      </form>
      <h3>
       Sin cuenta? crea una cuenta{" "}
        <span className="link" onClick={handleClik}>
          Aquí
        </span>
      </h3>
    </div>
  );
};

export default Page;
