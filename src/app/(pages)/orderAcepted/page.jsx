"use client";
import React from "react";
import "./orderAcepted.scss";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const ogRute = () => {
    router.push("/newOrder");
  };

  const nexRute = () => {
    router.push("/currentOrder");
  };

  return (
    <div className="orderAcepted">
      <section className="orderAcepted__section1">
        <i onClick={ogRute} className="bi bi-chevron-compact-left"></i>
        <span>Orden aceptada</span>
      </section>
      <img className="orderAcepted__img" src="./images/orderAcepted.png" />
      <button onClick={nexRute} className="btn bton_order" type="button">
        Follow order
      </button>
    </div>
  );
};

export default Page;
