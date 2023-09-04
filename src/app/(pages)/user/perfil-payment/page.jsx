'use client'

import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import './payment.scss'

const Page = () => {
  return (
    <div>
      <form className="pagos">
        <select className="form-select" aria-label="Default select example">
          <option selected>
          <i className="bi bi-credit-card"></i>
            Metodos de pago
            </option>
          <option value="1">Mastercard</option>
          <option value="2">Paypal</option>
        </select>
        <button className="buttonPAY">Agregar</button>
      </form>
      
    </div>
  );
};

export default Page;


