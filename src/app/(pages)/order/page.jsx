"use client";
import React, { useEffect, useState } from "react";
import "./order.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import {
  getDBOrder,
  getFormateoOrdenes,
  getOrdersForUser,
} from "@/services/orderHistoryData";

const Page = () => {
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  const handleClick = () => {
    router.push("/detail/82LMcy3gA7xCkxCu5lOK");
  };

  const Orders = async (uid) => {
    //const respuesta = await getOrdersForUser(uid);
    const otraRespuesta = await getFormateoOrdenes(
      "BYvjpJKl5Ibi5G3IK9Keuzv1ACF3"
    );
    // console.log(respuesta);
    // setOrders(respuesta);
    // const respuesta2 = await getDBOrder(respuesta[0].id);
    // console.log(respuesta2);
  };

  useEffect(() => {
    Orders(user.uid);
    getFormateoOrdenes();
    console.log(orders);
  }, []);

  return (
    <>
      <h4>All orders</h4>
      {orders?.map((order) => (
        <div className="orderPrimary" key={order.id}>
          <div className="orderSecundary">
            <div className="divSection">
              <img
                className="imgRestaurant"
                src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/restaurant-logo-design-template-b281aeadaa832c28badd72c1f6c5caad_screen.jpg?ts=1595421543"
                alt=""
              />

              <div>
                <span className="span1 ">
                  {console.log(order.RestaurantId)}
                </span>

                <span className="span2">{order.TotalPrice}</span>
              </div>
            </div>

            <div
              onClick={handleClick}
              className={order.Status ? "status" : "status2"}
            >
              {order.Status ? " Delivered" : "Cancelled"}
              <i className="bi bi-chevron-compact-right text-dark"></i>
            </div>
          </div>
        </div>
      ))}
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
