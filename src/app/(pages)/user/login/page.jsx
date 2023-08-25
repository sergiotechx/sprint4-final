"use client";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./login.scss";
import { useForm } from "@/hooks/useForm";
import { checkingAuthetication, startGoogleSignIn, startLoginWithEmailPassword } from "@/store/auth/thunks";
import { useRouter } from "next/navigation";


const Page = () => {

    const { status, errorMessage } = useSelector( state =>state.auth )

  const router = useRouter();  
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
 
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("GoogleSign");
    dispatch(startGoogleSignIn());
  };
  const handleClik = () => {
    router.push(`register`);
};

  return (
    <div>
      <form className=" form" onSubmit={onSubmit}>
        <h1>Init session</h1>
        <div className="mb-3">
          <label className="form-label">Email</label>
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
          <label className="form-label">Password</label>
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
        <button 
            disabled={ isAuthenticating }
            type="submit"
            className="login" >
          Login
        </button>
        <button
          disabled={ isAuthenticating }
          className="buttons__Goo"
          type="button"
          onClick={onGoogleSignIn}
        >
          Google
        </button>
        </div>
      </form>
      
      <div className="d-grid gap-2 d-md-flex justify-content-md-end buttons">
      <h3>Or created account  <span className="link" onClick={handleClik}>here</span></h3>
       
        {/* <button 
            className="buttons__Fac" 
            type="button">
          Facebook
        </button> */}
      </div>
    </div>
  );
};

export default Page;
