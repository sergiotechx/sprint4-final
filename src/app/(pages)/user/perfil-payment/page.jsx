'use client'

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import './payment.scss'
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { startUpdatingPayment } from "../../../../store/auth/thunks";
import { useForm } from "../../../../hooks/useForm";
import { updatePayment } from "../../../../store/auth/authSlice";

const Page = () => {
    const router = useRouter()
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const { formState, onInputChange} = useForm(
      {
        CreditCard: user.CreditCard || "",
        Paypal: user.Paypal || "",
      }
    );

    const handleClick = () =>{
        router.push('perfil')
    }

    const handleSavePayments = () => {
     
      dispatch(startUpdatingPayment(formState)); 
      
   
      dispatch(updatePayment(formState));
    };
  return (
    <div>
       <section className="inputs pagos ">
       <i onClick={handleClick} className="bi bi-chevron-left Back"></i>
          <div className="inputEditP">
            <label>n° CreditCard</label>
            <input
              type="number"
              name="CreditCard"
              value= {formState.CreditCard}
              onChange={onInputChange}
            />
          </div>
          <div className="inputEditP">
          <label>Paypal</label>
            <input
              type="text"
              name="Paypal"
              value={formState.Paypal}
              onChange={onInputChange}
            />
          </div>
          <button className="buttonAdd" onClick={handleSavePayments}>Agregar metodo</button>
          </section>
    </div>
  );
};

export default Page;



