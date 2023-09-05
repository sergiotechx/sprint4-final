"use client";
import React, { useEffect, useState } from "react";
import "./currentOrder.scss";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [totalProducts, setTotalProducts] = useState(0);
  const orders = useSelector((store) => store.order);
  const ordersIndex = orders.orders;
  const [quantities, setQuantities] = useState(
    ordersIndex.map((indexDetail) => indexDetail.Quantity)
  );

  const calculateTotalProducts = () => {
    let total = 0;
    for (let i = 0; i < ordersIndex.length; i++) {
      total += ordersIndex[i].Price * quantities[i];
    }
    return total;
  };

  const goRute = () => {
    router.push("/orderAcepted");
  };

  const goHome = () => {
    router.push("/home");
  };

  useEffect(() => {
    const total = calculateTotalProducts();
    setTotalProducts(total);
  }, []);

  return (
    <div className="currentOrder">
      <section className="currentOrder__section1">
        <i onClick={goRute} className="bi bi-chevron-compact-left"></i>
        <span>Current order</span>
      </section>
      <section className="currentOrder__section2">
        <img className="img__section2" src="./images/currentOrder.png" />
        <div className="div__section2">
          <section>
            <img
              className="confirmed"
              src="./images/currentOrderPuntito.svg"
              alt="Puntito"
            />
            <span className="confirmed2">Confirmed</span>
          </section>
          <section>
            <img src="./images/currentOrderPuntito.svg" alt="Puntito" />
            <span>Cooking</span>
          </section>
          <section>
            <img src="./images/currentOrderPuntito.svg" alt="Puntito" />
            <span>On the way</span>
          </section>
          <section>
            <img src="./images/currentOrderPuntito.svg" alt="Puntito" />
            <span>Delivered</span>
          </section>
        </div>
      </section>
      {ordersIndex?.map((indexDetail, index) => (
        <section className="currentOrder__section4" key={index}>
          <div>
            <img src={indexDetail?.PlateImage} />
            <label className="btn-group2">x{indexDetail?.Quantity}</label>
            <span>{indexDetail?.Name}</span>
          </div>
          <span>$ {indexDetail?.TotalPrice}</span>
        </section>
      ))}
      <section className="currentOrder__section6">
        <div>
          <span>Products</span>
          <span>$ {totalProducts}</span>
        </div>
        <div>
          <span>Delivey</span>
          <span>$ 4000</span>
        </div>
        <div className="rallita">
          <span>Total</span>
          <span>$ {totalProducts + 4000} </span>
        </div>
        <button onClick={goHome} className="btn bton_order" type="button">
          Menú inicio
        </button>
      </section>
    </div>
  );
};

export default Page;
