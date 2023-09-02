"use client";
import React, { useEffect, useState } from "react";
import "./order.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getDBOrder, getOrdersForUser } from "@/services/orderHistoryData";

const Page = () => {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const handleClick = () => {
    router.push("/detail/82LMcy3gA7xCkxCu5lOK");
  };

  const Orders = async (uid) => {
    const response = await getOrdersForUser('BYvjpJKl5Ibi5G3IK9Keuzv1ACF3');
    console.log('las ordenes',response);
    setOrders(response);
  };

  useEffect(() => {
    Orders(user.uid);
  }, []);

  return (
    <>
      <h4>All orders</h4>
      <div className="orderPrimary">
        <div className="orderSecundary">
          <div className="divSection">
            <img
              className="imgRestaurant"
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo-design-template-b281aeadaa832c28badd72c1f6c5caad_screen.jpg?ts=1595421543"
              alt=""
            />
            <div>
              <span className="span1">Parders restautant</span>
              <span className="span2">$ 132.00</span>
            </div>
          </div>
          <div onClick={handleClick} className="status">
            Delivered<i className="bi bi-chevron-compact-right text-dark"></i>
          </div>
        </div>
      </div>
      <div className="orderPrimary">
        <div className="orderSecundary">
          <div className="divSection">
            <img
              className="imgRestaurant"
              src="https://media-cdn.tripadvisor.com/media/photo-s/1c/40/16/27/estamos-ubicados-en-laureles.jpg"
              alt=""
            />
            <div>
              <span className="span1">Coffee place</span>
              <span className="span2">$ 55.20</span>
            </div>
          </div>
          <div onClick={handleClick} className="status2">
            Cancelled<i className="bi bi-chevron-compact-right text-dark"></i>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
//
