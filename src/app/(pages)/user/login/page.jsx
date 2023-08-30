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

const Page = () => {
  const { status } = useSelector((state) => state.auth);
  console.log("User data:", status);
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

  const onGoogleSignIn = () => {
    dispatch(chekingCredentials());
    dispatch(startGoogleSignIn()
   );
  };

  if (isLogin) {
    router.push("/");
  }
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
          <button disabled={isAuthenticating} type="submit" className="login">
            Login
          </button>
          <button
            disabled={isAuthenticating}
            className="buttons__Goo"
            type="button"
            onClick={onGoogleSignIn}
          >
            Google
          </button>
        </div>
      </form>
      <h3>
        Or created account{" "}
        <span className="link" onClick={handleClik}>
          here
        </span>
      </h3>
    </div>
  );
};

export default Page;
