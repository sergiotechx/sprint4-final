"use client";
import React from "react";
import "./order.scss";
import Footer from "@/components/footer/footer";

const Page = () => {
  const handleClick = () => {
    console.log("Hola mundo");
  };
  return (
    <div className="constainerFirts">
      <div className="containerPrimary">
        <section className="containerPrimary__section1">
          <img
            src="/images/chevron-back-outline.svg"
            alt="back"
            onClick={handleClick}
          />
          <span>23.08.2023</span>
        </section>
        <section className="containerPrimary__section2">
          <div>
            <span>
              <i>1x</i> Meat Pizza
            </span>
            <span className="value">$35.00</span>
          </div>
          <div>
            <span>
              <i>1x</i> Combinet
            </span>
            <span className="value">$45.00</span>
          </div>
        </section>
        <section className="containerPrimary__section3">
          <div>
            <span>Production cost</span>
            <span className="value">$66.49</span>
          </div>
          <div>
            <span>Cost of delivery</span>
            <span className="value">$8.00</span>
          </div>
        </section>
        <section className="containerPrimary__section4">
          <span>Total</span>
          <span>$74.49</span>
        </section>
      </div>
      <Footer />
    </div>
  );
};
export default Page;
