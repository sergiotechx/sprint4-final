"use client";

import React from "react";
import "./perfil-edit.scss";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../../hooks/useForm";
import { startUpdatingUser } from "../../../../store/auth/thunks";
import { updateUser } from "../../../../store/auth/authSlice";

const Page = () => {
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

  const handleSaveChanges = () => {
    dispatch(startUpdatingUser(formState));

    dispatch(updateUser(formState));
  };

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
          </figure>
          <i className="bi bi-camera C"></i>
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
            type="text"
            name="date"
            value={formState.date}
            onChange={onInputChange}
          />
        </div>
        <button className="buttonPE" onClick={handleSaveChanges}>Guardar Cambios</button>
      </section>
    </div>
<<<<<<< HEAD
  );
};
=======
    <section className='inputs'>
      <button className='buttonEdit'>{user.displayName}</button>
      <button className='buttonEdit'>{user.email}</button>
      <div className='inputEdit'>
        <input type="number" value={user?.celphone} />
        <i className="bi bi-pencil"></i>
      </div>
      
      <div className='inputEdit'>
        <input type="text" value={user?.date} />
        <i className="bi bi-pencil "></i>
      </div>
    </section>
  </div>
  )
}
>>>>>>> MaferVega

export default Page;
