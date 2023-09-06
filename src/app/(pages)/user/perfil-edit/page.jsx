"use client";

import React, { useEffect, useState } from "react";
import "./perfil-edit.scss";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import { startUpdatingUser } from "../../../../store/auth/thunks";
import { updateUser } from "../../../../store/auth/authSlice";
import { CldUploadButton } from "next-cloudinary";

const Page = () => {
  const [info, updateInfo] = useState("");
  const [error, updateError] = useState();
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { formState, onInputChange, isFormValid } = useForm({
    displayName: user.displayName,
    email: user.email,
    celphone: user.celphone,
    date: user.date,
  });

  const handleClick = () => {
    router.push("perfil");
  };
  function handleOnUpload(result, operations) {
    if (!result.event === "success") {
      updateError(result?.info);
      return;
    }

    updateInfo(result?.info.secure_url);
  }

  const handleSaveChanges = () => {
    if (info) {
      const editProfile = {
        ...formState,
        photoURL: info,
      };

      dispatch(startUpdatingUser(editProfile));
      dispatch(updateUser(editProfile));
      updateInfo("");
    } else {
      const editProfile2 = {
        ...formState,
        photoURL: user.photoURL,
      };
      dispatch(startUpdatingUser(editProfile2));
      dispatch(updateUser(editProfile2));
    }
  };

  // useEffect(() => {
  //   console.log(info);
  // }, [info]);

  return (
    <div className="perfilE">
      <div className="header">
        <span>
          <i onClick={handleClick} className="bi bi-chevron-left B"></i>
        </span>
        <div className="imageEdit">
          <p>Profile</p>
          <figure className="figurEdit">
            <img src={user.photoURL} alt="" />
            <CldUploadButton
              uploadPreset="FoodyPreset"
              onUpload={handleOnUpload}
              id="cloudinary"
            >
              <i className="bi bi-camera C" />
            </CldUploadButton>
          </figure>
        </div>
      </div>
      <section className="inputs">
        <div className="inputEdit">
          <input
            type="text"
            name="displayName"
            value={formState.displayName}
            onChange={onInputChange}
          />
        </div>
        <button className="buttonEdit">{user.email}</button>
        <div className="inputEdit">
          <input
            type="number"
            name="celphone"
            value={formState.celphone}
            onChange={onInputChange}
          />
        </div>
        <div className="inputEdit">
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={onInputChange}
          />
        </div>
        <button className="buttonPE" onClick={handleSaveChanges}>
          Guardar Cambios
        </button>
      </section>
    </div>
  );
};

export default Page;
